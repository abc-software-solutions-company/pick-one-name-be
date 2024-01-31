import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { RandomType } from '@/modules/randoms/entities/random.entity';
import { User } from '@/modules/users/entities/user.entity';

export class CreateEventDto {
  @ApiPropertyOptional({ example: 'tất niên' })
  @IsOptional()
  name?: string;

  @ApiProperty({ example: '<Random Types id>' })
  random: RandomType;

  @ApiProperty({ example: '<User id>' })
  author: User;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  isActive?: boolean;
}
