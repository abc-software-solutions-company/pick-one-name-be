import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import helmet, { HelmetOptions } from 'helmet';

@Injectable()
export class HelmetMiddleware implements NestMiddleware {
  public static configure(opts: HelmetOptions) {
    this.options = opts;
  }

  private static options: HelmetOptions;

  use(req: Request, res: Response, next: NextFunction) {
    if (HelmetMiddleware.options) {
      helmet(HelmetMiddleware.options)(req, res, next);
    } else {
      helmet()(req, res, next);
    }
  }
}
