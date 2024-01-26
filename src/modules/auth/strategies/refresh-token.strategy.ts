import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { IConfigs } from '@/common/interfaces';

type JwtRefreshDecodedPayload = {
  id: string;
  email: string;
  iat: number;
  exp: number;
};

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(configService: ConfigService<IConfigs>) {
    const { jwtRefreshSecretKey } = configService.get<IConfigs['auth']>('auth');

    super({
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: jwtRefreshSecretKey,
      jwtFromRequest: ExtractJwt.fromBodyField('token')
    });
  }

  async validate(payload: JwtRefreshDecodedPayload) {
    const isTokenExpired = payload.exp < Date.now() / 1000;

    if (isTokenExpired) throw new BadRequestException('Token expired');

    return payload;
  }
}
