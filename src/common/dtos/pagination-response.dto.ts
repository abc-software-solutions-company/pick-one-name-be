import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

import { PaginationDto } from './pagination.dto';

export class PaginationResponseDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  data: T[];

  @ApiProperty({
    type: () => {
      return {
        paging: PaginationDto
      };
    }
  })
  meta: {
    paging: PaginationDto;
  };

  constructor(
    data: T[],
    meta: {
      paging: PaginationDto;
    }
  ) {
    this.data = data;
    this.meta = meta;
  }
}
