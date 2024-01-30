import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { RANDOM_TYPE } from '../constants/random.constant';

export class CreateRandomDto {
  @ApiPropertyOptional({ example: 'number' })
  @IsOptional()
  type: RANDOM_TYPE;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  is_active: boolean;
}
