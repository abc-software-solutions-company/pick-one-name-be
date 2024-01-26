import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import isbot from 'isbot';

@Injectable()
export class BotCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const userAgent = req.headers['user-agent'] || '';

    if (isbot(userAgent)) {
      return res.status(403).json({ message: 'Bot access not allowed.' });
    }

    next();
  }
}
