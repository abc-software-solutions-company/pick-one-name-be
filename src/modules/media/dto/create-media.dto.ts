import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { Trim } from '@/common/decorators';

export class CreateMediaDto {
  @ApiProperty({
    type: String,
    description: 'File name that will upload',
    example: 'hehehe.js'
  })
  @IsString({ message: 'File name must be a string' })
  @IsNotEmpty()
  @Trim()
  fileName: string;
}
