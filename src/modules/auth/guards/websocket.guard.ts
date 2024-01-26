import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { IConfigs } from '@/common/interfaces';

@Injectable()
export class WebsocketGuard implements CanActivate {
  constructor(private readonly configService: ConfigService, private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const { jwtSecretKey } = this.configService.get<IConfigs['auth']>('auth');

    const ctx = context.switchToWs();
    const client = ctx.getClient();

    try {
      const payload = await this.jwtService.verifyAsync(client.handshake.auth.token, { secret: jwtSecretKey });

      ctx.getData().user = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
