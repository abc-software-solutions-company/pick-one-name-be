import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const uuid: string = uuidv4();

    req.headers['X-Requested-Id'] = uuid;
    req.id = uuid;

    next();
  }
}
