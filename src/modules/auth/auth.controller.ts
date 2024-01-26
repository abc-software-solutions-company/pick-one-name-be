import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Request } from 'express';

import { ApiDocumentResponse, Response } from '@/common/decorators';

import { LogOutDoc } from './docs/log-out';
import { LoginWithCredentialsDoc } from './docs/login-with-credentials.doc';
import { LoginWithFacebookDoc } from './docs/login-with-facebook.doc';
import { LoginWithGoogleDoc } from './docs/login-with-google.doc';
import { SignUpDoc } from './docs/signup.doc';
import { OAuthSignInDto, SignInDto, SignOutDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Throttle(2, 60)
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login with credentials.' })
  @ApiDocumentResponse({ message: 'Login successfully.', model: LoginWithCredentialsDoc })
  @Response({ message: 'Login successfully.' })
  async login(@Req() req: Request, @Body() signInDto: SignInDto) {
    const resp = await this.authService.signIn(
      signInDto,
      req.ip as string,
      req.headers['user-agent'] || '',
      (req.headers['x-fingerprint'] as string) || ''
    );

    return resp;
  }

  @Post('login/google')
  @ApiOperation({ summary: 'Login with Google.' })
  @ApiDocumentResponse({ message: 'Login successfully.', model: LoginWithGoogleDoc })
  @Response({ message: 'Login successfully.' })
  async signInWithGoogle(@Req() req: Request, @Body() oAuthSignInDto: OAuthSignInDto) {
    const resp = await this.authService.signInWithGoogle(
      oAuthSignInDto,
      req.ip as string,
      req.headers['user-agent'] || '',
      req.headers['x-fingerprint'] as string
    );

    return resp;
  }

  @Post('login/facebook')
  @ApiOperation({ summary: 'Login with Facebook.' })
  @ApiDocumentResponse({ message: 'Login successfully.', model: LoginWithFacebookDoc })
  @Response({ message: 'Login successfully.' })
  async signInWithFacebook(@Req() req: Request, @Body() oAuthSignInDto: OAuthSignInDto) {
    const resp = await this.authService.signInWithFacebook(
      oAuthSignInDto,
      req.ip as string,
      req.headers['user-agent'] || '',
      req.headers['x-fingerprint'] as string
    );

    return resp;
  }

  @Post('logout')
  @ApiOperation({ summary: 'Log out.' })
  @ApiDocumentResponse({ message: 'Logout successfully.', model: LogOutDoc })
  @Response({ message: 'Logout successfully.' })
  async signOut(@Req() req: Request, @Body() signOutDto: SignOutDto) {
    return this.authService.signOut(signOutDto, req.ip as string, req.headers['user-agent'] || '');
  }

  @Post('signup')
  @ApiOperation({ summary: 'Create account.' })
  @ApiDocumentResponse({ message: 'Create account successfully.', model: SignUpDoc })
  @Response({ message: 'Create account successfully.' })
  async signUp(@Body() createUserDto: CreateUserDto) {
    const resp = await this.usersService.create(createUserDto);

    return resp;
  }
}
