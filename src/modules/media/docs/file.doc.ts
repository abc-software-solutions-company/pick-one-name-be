import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { Doc } from '@/common/decorators/doc.decorator';

import { PresignedUrlResponseDto } from '../dto';

export function GeneratePresignedUrlDoc(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Generate presigned url' }),
    Doc<PresignedUrlResponseDto>('Generate presigned url success', {
      auth: {
        jwtAccessToken: true
      },
      response: [
        {
          httpStatus: HttpStatus.CREATED,
          classSerialization: PresignedUrlResponseDto
        },
        {
          statusCode: HttpStatus.BAD_REQUEST,
          httpStatus: HttpStatus.BAD_REQUEST,
          message: `File name must be a string`
        }
      ]
    })
  );
}
