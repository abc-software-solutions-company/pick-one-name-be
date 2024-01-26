import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

import { ORDER } from '../constants';

export class BaseFilterDto {
  @ApiPropertyOptional({ type: Number, minimum: 1, default: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({ type: Number, minimum: 1, maximum: 100, default: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number = 10;
  get skip() {
    return (this.page - 1) * this.limit;
  }

  @ApiPropertyOptional({ type: String })
  @Type(() => String)
  @IsOptional()
  q?: string = '';

  @ApiPropertyOptional({ type: String })
  @Type(() => String)
  @IsOptional()
  sort?: string = '';

  @ApiPropertyOptional({ enum: ORDER, default: ORDER.DESC })
  @IsEnum(ORDER)
  @IsOptional()
  order?: ORDER = ORDER.DESC;
}
