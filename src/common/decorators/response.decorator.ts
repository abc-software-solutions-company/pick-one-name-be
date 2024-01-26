import { applyDecorators, HttpCode, HttpStatus, SetMetadata, UseInterceptors } from '@nestjs/common';

import { ResponseInterceptor } from '@/common/interceptors/response.interceptor';

export const Response = <T>(params: { status?: HttpStatus; message: string }) => {
  return applyDecorators(
    HttpCode(params.status || HttpStatus.OK),
    UseInterceptors(ResponseInterceptor<T>),
    SetMetadata('RESPONSE_MESSAGE_META_KEY', params.message)
  );
};
