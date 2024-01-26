import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { ApiDocumentResponse, Response } from '@/common/decorators';

import { RefreshRefreshTokenDoc } from './docs/refresh-refresh-token.doc';
import { RevokeRefreshTokenDoc } from './docs/revoke-refresh-token.doc';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RefreshTokensService } from './refresh-tokens.service';

import { RefreshTokenGuard } from '../auth/guards/refresh-token.guard';
import { User } from '../users/entities/user.entity';

@ApiTags('Refresh Tokens')
@Controller('refresh-tokens')
export class RefreshTokensController {
  constructor(private readonly refreshTokensService: RefreshTokensService) {}

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh refresh token.' })
  @ApiDocumentResponse({ message: 'Refresh refresh token successfully.', model: RefreshRefreshTokenDoc })
  @Response({ message: 'Refresh refresh token successfully.' })
  async refresh(@Req() req: Request, @Body() refreshTokenDto: RefreshTokenDto) {
    const user = req.user as User;

    const resp = await this.refreshTokensService.refresh(
      user.id,
      refreshTokenDto.token,
      req.ip as string,
      req.headers['user-agent'] || '',
      (req.headers['x-fingerprint'] as string) || ''
    );

    return {
      accessToken: resp.user.accessToken,
      refreshToken: resp.user.refreshToken
    };
  }

  @UseGuards(RefreshTokenGuard)
  @Post('revoke')
  @ApiOperation({ summary: 'Revoke refresh token.' })
  @ApiDocumentResponse({ message: 'Revoke refresh token successfully.', model: RevokeRefreshTokenDoc })
  @Response({ message: 'Revoke refresh token successfully.' })
  async revoke(@Req() req: Request, @Body() refreshTokenDto: RefreshTokenDto) {
    return this.refreshTokensService.revoke(refreshTokenDto.token, req.ip as string, req.headers['user-agent'] || '');
  }
}
