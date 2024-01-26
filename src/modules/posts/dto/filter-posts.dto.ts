import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

import { BaseFilterDto } from '@/common/dtos/base-filter.dto';

import { POST_STATUS } from '../constants/posts.constant';

export class FilterPostDto extends BaseFilterDto {
  @ApiPropertyOptional({ enum: POST_STATUS, default: POST_STATUS.PUBLISHED })
  @IsEnum(POST_STATUS)
  @IsOptional()
  readonly status?: POST_STATUS;
}
