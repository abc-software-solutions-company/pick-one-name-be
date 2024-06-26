import { Module } from '@nestjs/common';

import { AuthModule } from '@/modules/auth/auth.module';
import { RefreshTokensModule } from '@/modules/refresh-tokens/refresh-tokens.module';
import { SocketModule } from '@/modules/socket/socket.module';
import { UsersModule } from '@/modules/users/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BaseModule } from '../base/base.module';
import { EventsModule } from '../events/events.module';
import { MediaModule } from '../media/media.module';
import { RandomsModule } from '../randoms/randoms.module';

@Module({
  imports: [
    BaseModule,
    UsersModule,
    AuthModule,
    RefreshTokensModule,
    SocketModule,
    RandomsModule,
    EventsModule,
    MediaModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
