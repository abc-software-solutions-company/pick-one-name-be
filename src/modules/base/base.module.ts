import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule, Params } from 'nestjs-pino';
import path from 'path';
import { RedisClientOptions } from 'redis';

import configs from '@/configs';

import { IConfigs } from '@/common/interfaces';

import { pinoDevOptions, pinoOptions, SnakeNamingStrategy } from '@/common/utils';

import { MiddlewareModule } from '@/common/middlewares/middlewares.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      envFilePath: path.join(__dirname, `../../../.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`)
    }),
    MiddlewareModule,
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => {
        return {
          pinoHttp: process.env.NODE_ENV === 'development' ? pinoDevOptions : pinoOptions
        } as Params;
      }
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<IConfigs>) => {
        const { host, port, username, password, name, isLoggingEnable } =
          configService.get<IConfigs['database']>('database');

        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database: name,
          isLoggingEnable,
          entities: [path.join(__dirname, '../../modules/**/*.entity{.ts,.js}')],
          migrations: [path.join(__dirname, '../../database/migrations/*{.ts,.js}')],
          subscribers: [path.join(__dirname, '../../database/subscriber/*{.ts,.js}')],
          namingStrategy: new SnakeNamingStrategy()
        };
      }
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<IConfigs>) => {
        const { jwtExpiresIn, jwtSecretKey } = configService.get<IConfigs['auth']>('auth');

        return {
          secret: jwtSecretKey,
          signOptions: { algorithm: 'HS256', expiresIn: jwtExpiresIn },
          verifyOptions: { algorithms: ['HS256'], ignoreExpiration: false }
        };
      }
    }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<IConfigs>) => {
        const { timeout } = configService.get<IConfigs['http']>('http');

        return {
          timeout
        };
      }
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<IConfigs>) => {
        const {
          rateLimit: { timeToLive, limit }
        } = configService.get<IConfigs['middlewares']>('middlewares');

        return {
          ttl: timeToLive,
          limit: limit
        };
      }
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: async (configService: ConfigService<IConfigs>) => {
        const { timeToLive } = configService.get<IConfigs['cache']>('cache');
        const { host, port } = configService.get<IConfigs['redis']>('redis');

        return {
          ttl: timeToLive,
          host,
          port
        };
      }
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<IConfigs>) => {
        const { host, port } = configService.get<IConfigs['redis']>('redis');

        return {
          redis: {
            host,
            port
          }
        };
      }
    }),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot()
  ]
})
export class BaseModule {}
