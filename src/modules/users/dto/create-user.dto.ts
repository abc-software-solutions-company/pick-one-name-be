import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

import { AUTH_PROVIDER, AUTH_TYPE } from '@/modules/auth/constants/auth.constant';

import { PLAN } from '../constants/users.constant';

export class CreateUserDto {
  @ApiProperty({ example: 'Tin Tran' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'tindl88@gmail.com' })
  @IsEmail()
  readonly email: string;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  avatar?: string;

  @ApiPropertyOptional({ example: '<PASSWORD>' })
  @IsOptional()
  password?: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  emailVerified?: boolean;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  providerAccountId?: string;

  @ApiPropertyOptional({ example: AUTH_PROVIDER.CREDENTIALS })
  @IsOptional()
  provider?: AUTH_PROVIDER;

  @ApiPropertyOptional({ example: PLAN.FREE })
  @IsOptional()
  plan?: PLAN;

  @ApiPropertyOptional({ example: AUTH_TYPE.CREDENTIALS })
  @IsOptional()
  authType?: AUTH_TYPE;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  isActive?: boolean;
}
