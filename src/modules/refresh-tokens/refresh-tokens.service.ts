import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';
import { RefreshToken } from './entities/refresh-token.entity';

import { TokenService } from '../shared/token.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class RefreshTokensService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private readonly userService: UsersService,
    private readonly tokenService: TokenService
  ) {}

  create(createRefreshTokenDto: CreateRefreshTokenDto) {
    const refreshToken = this.refreshTokenRepository.create(createRefreshTokenDto);

    return this.refreshTokenRepository.save(refreshToken);
  }

  async findByActiveToken(token: string, _userAgent: string) {
    const refreshToken = await this.refreshTokenRepository.findOneBy({
      token
    });

    if (!refreshToken) {
      throw new NotFoundException('Refresh token not found');
    }

    return refreshToken;
  }

  async refresh(userId: string, token: string, ipAddress: string, userAgent: string, fingerPrint: string) {
    const user = await this.userService.findOne(userId);

    const accessToken = await this.tokenService.createAccessToken(user);

    const refreshToken = await this.tokenService.createRefreshToken(user);

    const currentRefreshToken = await this.findByActiveToken(token, userAgent);

    currentRefreshToken.replacedByToken = refreshToken;

    await this.refreshTokenRepository.save(currentRefreshToken);

    await this.create({
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
        accessToken,
        refreshToken
      }
    };
  }

  async revoke(token: string, ipAddress: string, userAgent: string) {
    const refreshToken = await this.findByActiveToken(token, userAgent);

    await this.refreshTokenRepository.save(refreshToken);

    return { status: 'success' };
  }
}
