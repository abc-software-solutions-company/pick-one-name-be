import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

import { ResponseSerialization } from './response.serialization';

import { PaginationResponseDto } from '../dtos/pagination-response.dto';

export class ResponsePagingSerialization<T = Record<string, any>> extends PickType(ResponseSerialization, [
  'statusCode',
  'message'
] as const) {
  @ApiProperty({ type: () => PaginationResponseDto })
  readonly meta: PaginationResponseDto<T>;

  @IsArray()
  @ApiProperty({
    isArray: true
  })
  readonly data: T[];
}
