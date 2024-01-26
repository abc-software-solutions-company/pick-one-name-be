import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { type Response } from 'express';
import { STATUS_CODES } from 'http';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryFailedErrorFilter implements ExceptionFilter {
  catch(exception: QueryFailedError & { constraint?: string }, host: ArgumentsHost) {
    if (host.getType() === 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const status = exception.constraint?.startsWith('UQ') ? HttpStatus.CONFLICT : HttpStatus.INTERNAL_SERVER_ERROR;

      response.status(status).json({
        statusCode: status,
        error: STATUS_CODES[status],
        message: exception.message
      });
    }
  }
}
