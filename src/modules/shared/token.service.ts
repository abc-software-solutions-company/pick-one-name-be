import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IConfigs } from '@/common/interfaces';

import { createToken } from '@/common/utils';

import { User } from '@/modules/users/entities/user.entity';

@Injectable()
export class TokenService {
  constructor(private readonly configService: ConfigService<IConfigs>) {}

  async createAccessToken(user: User) {
    const { jwtSecretKey, jwtExpiresIn } = this.configService.get<IConfigs['auth']>('auth');
    const accessToken = createToken({ id: user.id, email: user.email, role: user.role }, jwtSecretKey, {
      expiresIn: jwtExpiresIn
    });

    return accessToken;
  }

  async createRefreshToken(user: User) {
    const { jwtRefreshSecretKey, jwtRefreshExpiresIn } = this.configService.get<IConfigs['auth']>('auth');
    const refreshToken = createToken({ id: user.id, email: user.email }, jwtRefreshSecretKey, {
      expiresIn: jwtRefreshExpiresIn
    });

    return refreshToken;
  }
}
