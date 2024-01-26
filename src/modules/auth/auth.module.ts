import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { RefreshTokensModule } from '../refresh-tokens/refresh-tokens.module';
import { TokenService } from '../shared/token.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PassportModule, HttpModule, UsersModule, RefreshTokensModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy, TokenService]
})
export class AuthModule {}
