import { Module } from '@nestjs/common';

import { AuthModule } from '@/modules/auth/auth.module';
import { PostsModule } from '@/modules/posts/posts.module';
import { RefreshTokensModule } from '@/modules/refresh-tokens/refresh-tokens.module';
import { SocketModule } from '@/modules/socket/socket.module';
import { UsersModule } from '@/modules/users/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BaseModule } from '../base/base.module';

@Module({
  imports: [BaseModule, UsersModule, AuthModule, RefreshTokensModule, PostsModule, SocketModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
