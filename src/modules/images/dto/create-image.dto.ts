import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

import { User } from '@/modules/users/entities/user.entity';

export class CreateImageDto {
  @ApiProperty({ example: '<image src>' })
  @IsNotEmpty()
  src: string;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  isActive: boolean;

  @ApiProperty({ example: '<User id>' })
  @IsNotEmpty()
  author: User;
}
