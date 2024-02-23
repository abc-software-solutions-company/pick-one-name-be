import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { Trim } from '@/common/decorators';

export class RequestPresignedUrlDto {
  @ApiProperty({
    type: String,
    description: 'File name that will upload',
    example: 'yen-sao-khanh-hoa-1.jpg'
  })
  @IsString({ message: 'File name must be a string' })
  @IsNotEmpty()
  @Trim()
  fileName: string;
}
