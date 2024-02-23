import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ResponseIdSerialization {
  @ApiProperty({
    description: 'Id that representative with your target data',
    example: 'f48fe17c-5d84-4230-bd11-0d1e6e8e982c',
    required: true
  })
  @Type(() => String)
  id: string;
}
