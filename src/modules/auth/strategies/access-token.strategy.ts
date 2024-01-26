import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { IConfigs } from '@/common/interfaces';

import { UsersService } from '@/modules/users/users.service';

type JwtDecodedPayload = {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService<IConfigs>, private usersService: UsersService) {
    const { jwtSecretKey } = configService.get<IConfigs['auth']>('auth');

    super({
      ignoreExpiration: false,
      secretOrKey: jwtSecretKey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    });
  }

  async validate(payload: JwtDecodedPayload) {
    const isTokenExpired = payload.exp < Date.now() / 1000;

    if (isTokenExpired) throw new BadRequestException('Token expired');

    return payload;
  }
}
