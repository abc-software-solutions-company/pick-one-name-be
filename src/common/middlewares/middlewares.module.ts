import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

// import { BotCheckMiddleware } from './bot-check.middleware';
import { CompressionMiddleware } from './compression.middleware';
import { HelmetMiddleware } from './helmet.middleware';
import { RequestIdMiddleware } from './request-id.middleware';

@Module({})
export class MiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HelmetMiddleware, CompressionMiddleware, RequestIdMiddleware /*, BotCheckMiddleware*/)
      .forRoutes('*');
  }
}
