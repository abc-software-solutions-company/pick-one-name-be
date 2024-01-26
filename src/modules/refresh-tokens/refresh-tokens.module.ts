import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RefreshToken } from './entities/refresh-token.entity';
import { RefreshTokensController } from './refresh-tokens.controller';
import { RefreshTokensService } from './refresh-tokens.service';

import { TokenService } from '../shared/token.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([RefreshToken]), UsersModule],
  controllers: [RefreshTokensController],
  providers: [RefreshTokensService, JwtService, TokenService],
  exports: [RefreshTokensService]
})
export class RefreshTokensModule {}
