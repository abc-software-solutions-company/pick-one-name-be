import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Catch(WsException)
export class WsExceptionFilter implements ExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    const response = ctx.getClient();

    response.emit('exception', { statusCode: HttpStatus.UNAUTHORIZED, message: 'Unauthorized' });
  }
}
