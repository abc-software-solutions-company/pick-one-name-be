import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IResponseFormat } from '@/common/interfaces';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, IResponseFormat<T>> {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<IResponseFormat<T>> {
    if (context.getType() === 'http') {
      const ctx = context.switchToHttp();
      const response: Response = ctx.getResponse();
      const statusCode = response.statusCode;
      const message = this.reflector.get<string>('RESPONSE_MESSAGE_META_KEY', context.getHandler());

      return next.handle().pipe(
        map((data: T) => {
          return {
            statusCode,
            message,
            data
          };
        })
      );
    }

    return next.handle();
  }
}
