import { Injectable, NestMiddleware } from '@nestjs/common';
import compression from 'compression';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CompressionMiddleware implements NestMiddleware {
  public static configure(opts: compression.CompressionOptions) {
    this.options = opts;
  }

  private static options: compression.CompressionOptions;

  use(req: Request, res: Response, next: NextFunction) {
    if (CompressionMiddleware.options) {
      compression(CompressionMiddleware.options)(req, res, next);
    } else {
      compression()(req, res, next);
    }
  }
}
