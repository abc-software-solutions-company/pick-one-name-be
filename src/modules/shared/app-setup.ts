import { ClassSerializerInterceptor, Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { Logger as PinoLogger } from 'nestjs-pino';

import { QueryFailedErrorFilter, WsExceptionFilter } from '@/common/filters';

import { IConfigs } from '@/common/interfaces';

export class ApplicationSetup {
  private app: NestExpressApplication;

  constructor(app: NestExpressApplication) {
    this.app = app;
  }

  setupGlobals() {
    const reflector = this.app.get(Reflector);

    const configService = this.app.get(ConfigService);
    const {
      cors: { allowHeaders, allowMethods, allowOrigin }
    } = configService.get<IConfigs['middlewares']>('middlewares');

    this.app.enable('trust proxy');
    this.app.enableCors({
      credentials: true,
      origin: allowOrigin,
      methods: allowMethods,
      allowedHeaders: allowHeaders
    });
    if (process.env.NODE_ENV !== 'test') this.app.useLogger(this.app.get(PinoLogger));
    this.app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: false,
        skipNullProperties: false,
        skipUndefinedProperties: false,
        skipMissingProperties: false,
        validationError: { target: false },
        transformOptions: { enableImplicitConversion: true }
      })
    );
    this.app.useGlobalFilters(new QueryFailedErrorFilter(), new WsExceptionFilter());
    this.app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
    this.app.setGlobalPrefix('/api');
    this.app.enableVersioning({ type: VersioningType.URI, prefix: 'v', defaultVersion: '1' });
    this.app.use(cookieParser());
  }

  async setupLogger() {
    const logger = new Logger();
    const configService = this.app.get(ConfigService);
    const { isDocumentationEnabled } = configService.get<IConfigs['app']>('app');

    logger.log(`==========================================================`);
    logger.log(`Http Server running on ${await this.app.getUrl()}`, 'NestApplication');
    if (isDocumentationEnabled) {
      logger.log(`==========================================================`);
      logger.log(`Documentation: ${await this.app.getUrl()}/documentation`);
    }
    logger.log(`==========================================================`);

    return logger;
  }

  async setupDocument() {
    const configService = this.app.get(ConfigService);
    const { isDocumentationEnabled } = configService.get<IConfigs['app']>('app');

    if (isDocumentationEnabled) {
      const documentConfig = new DocumentBuilder()
        .setTitle('NestJs Template')
        .setDescription('The NestJs Template API description')
        .setVersion('1.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'accessToken')
        .build();
      const document = SwaggerModule.createDocument(this.app, documentConfig);

      SwaggerModule.setup('documentation', this.app, document);
    }
  }

  async setupProcess(logger: Logger) {
    process.on('uncaughtException', error => {
      logger.error(error);
      process.exit(1);
    });

    process.on('unhandledRejection', reason => {
      logger.error(reason);
      process.exit(1);
    });
  }
}
