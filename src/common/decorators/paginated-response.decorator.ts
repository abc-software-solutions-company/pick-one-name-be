import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';

import { PaginatedResponseInterceptor } from '@/common/interceptors/paginated-response.interceptor';

export const PaginatedResponse = <T>(params: { message: string }) => {
  return applyDecorators(
    UseInterceptors(PaginatedResponseInterceptor<T>),
    SetMetadata('RESPONSE_MESSAGE_META_KEY', params.message)
  );
};
