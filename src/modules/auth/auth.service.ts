import { HttpService } from '@nestjs/axios';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from '@/modules/users/users.service';

import { AUTH_PROVIDER, AUTH_TYPE } from './constants/auth.constant';
import { OAuthSignInDto, SignInDto, SignOutDto } from './dto/auth.dto';
import { IOAuthFacebookProfile, IOAuthGoogleProfile, IOAuthProfile } from './interfaces';

import { RefreshTokensService } from '../refresh-tokens/refresh-tokens.service';
import { TokenService } from '../shared/token.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private httpService: HttpService,
    private refreshTokensService: RefreshTokensService,
    private tokenService: TokenService
  ) {}

  async signIn(signInDto: SignInDto, ipAddress: string, userAgent: string, fingerPrint: string) {
    const { email, password } = signInDto;

    const user = await this.usersService.findByEmailAndPassword(email, password);

    if (user) {
      if (!user.isActive) {
        throw new UnauthorizedException('User is inactive');
      }
    } else {
      throw new UnauthorizedException('User not found');
    }

    const accessToken = await this.tokenService.createAccessToken(user);

    const refreshToken = await this.tokenService.createRefreshToken(user);

    await this.refreshTokensService.create({
      user,
      token: refreshToken,
      createdByIp: ipAddress,
      userAgent,
      fingerPrint
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        plan: user.plan,
        accessToken,
        refreshToken
      }
    };
  }

  async signInWithGoogle(oAuthSignInDto: OAuthSignInDto, ipAddress: string, userAgent: string, fingerPrint: string) {
    const { token } = oAuthSignInDto;

    // Get user account from Google
    const googleProfile = await this.getGoogleAccount(token);

    // Find user by email
    let user = await this.usersService.findByEmail(googleProfile.email);

    if (user) {
      // Check if user is active
      if (!user.isActive) {
        throw new UnauthorizedException('User is inactive');
      }
      // Check if user is existing with another provider
      if (user.provider !== AUTH_PROVIDER.GOOGLE) {
        throw new ConflictException(`User is existing with ${user.provider} provider.`);
      }
      // Find user using Google OAuth account
      user = await this.usersService.findByOAuthAccount(AUTH_PROVIDER.GOOGLE, googleProfile.sub);
    } else {
      // Create new user from Google OAuth account
      user = await this.createNewUserFromOAuthProfile(AUTH_PROVIDER.GOOGLE, googleProfile);
    }

    // Create access token
    const accessToken = await this.tokenService.createAccessToken(user);

    // Create refresh token
    const refreshToken = await this.tokenService.createRefreshToken(user);

    // Create a new refresh token record in database
    this.refreshTokensService.create({ user, token: refreshToken, createdByIp: ipAddress, userAgent, fingerPrint });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        plan: user.plan,
        accessToken,
        refreshToken
      }
    };
  }

  async signInWithFacebook(oAuthSignInDto: OAuthSignInDto, ipAddress: string, userAgent: string, fingerPrint: string) {
    const { token } = oAuthSignInDto;

    // Get user account from Facebook
    const userInfo = await this.getFacebookAccount(token);

    // Find user by email
    let user = await this.usersService.findByEmail(userInfo.email);

    if (user) {
      // Check if user is active
      if (!user.isActive) {
        throw new UnauthorizedException('User is inactive');
      }
      // Check if user is existing with another provider
      if (user.provider !== AUTH_PROVIDER.FACEBOOK) {
        throw new ConflictException(`User is existing with ${user.provider} provider.`);
      }
      // Find user using Facebook OAuth account
      user = await this.usersService.findByOAuthAccount(AUTH_PROVIDER.FACEBOOK, userInfo.id);
    } else {
      // Create new user from Facebook OAuth account
      user = await this.createNewUserFromOAuthProfile(AUTH_PROVIDER.FACEBOOK, userInfo);
    }
    // Create access token
    const accessToken = await this.tokenService.createAccessToken(user);

    // Create refresh token
    const refreshToken = await this.tokenService.createRefreshToken(user);

    // Create a new refresh token record in database
    this.refreshTokensService.create({ user, token: refreshToken, createdByIp: ipAddress, userAgent, fingerPrint });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        plan: user.plan,
        avatar: user.avatar,
        accessToken,
        refreshToken
      }
    };
  }

  async signOut(signOutDto: SignOutDto, ipAddress: string, userAgent: string) {
    const { token } = signOutDto;

    return this.refreshTokensService.revoke(token, ipAddress, userAgent);
  }

  async createNewUserFromOAuthProfile(provider: AUTH_PROVIDER, profile: unknown) {
    let transformedData: IOAuthProfile;

    switch (provider) {
      case AUTH_PROVIDER.GOOGLE:
        transformedData = await this.transformGoogleProfile(profile as IOAuthGoogleProfile);
        break;
      case AUTH_PROVIDER.FACEBOOK:
        transformedData = await this.transformFacebookProfile(profile as IOAuthFacebookProfile);
        break;
    }

    const newUser = await this.usersService.create({
      name: transformedData.name,
      email: transformedData.email,
      avatar: transformedData.avatar,
      emailVerified: transformedData.emailVerified,
      providerAccountId: transformedData.providerAccountId,
      provider,
      authType: AUTH_TYPE.OAUTH
    });

    return newUser;
  }

  async getGoogleAccount(token: string): Promise<IOAuthGoogleProfile> {
    const response = await this.httpService.axiosRef.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);

    return response.data;
  }

  async getFacebookAccount(token: string): Promise<IOAuthFacebookProfile> {
    const response = await this.httpService.axiosRef.get(
      `https://graph.facebook.com/v18.0/me?fields=id,name,email,picture&access_token=${token}`
    );

    return response.data;
  }

  async transformFacebookProfile(profile: IOAuthFacebookProfile): Promise<IOAuthProfile> {
    return {
      name: profile.name,
      email: profile.email,
      avatar: profile.picture?.data?.url,
      providerAccountId: profile.id
    };
  }

  async transformGoogleProfile(profile: IOAuthGoogleProfile): Promise<IOAuthProfile> {
    return {
      name: profile.name,
      email: profile.email,
      avatar: profile.picture,
      providerAccountId: profile.sub,
      emailVerified: Boolean(profile.email_verified),
      locale: profile.locale
    };
  }
}
