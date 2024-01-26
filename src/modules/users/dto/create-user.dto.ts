import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

import { AUTH_PROVIDER, AUTH_TYPE } from '@/modules/auth/constants/auth.constant';

import { GENDER, ROLE, USER_STATUS } from '../constants/users.constant';

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

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  phoneNumber?: string;

  @ApiPropertyOptional({ example: '<PASSWORD>' })
  @IsOptional()
  password?: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  emailVerified?: boolean;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  locale?: string;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  providerAccountId?: string;

  @ApiPropertyOptional({ example: AUTH_PROVIDER.CREDENTIALS })
  @IsOptional()
  provider?: AUTH_PROVIDER;

  @ApiPropertyOptional({ example: AUTH_TYPE.CREDENTIALS })
  @IsOptional()
  authType?: AUTH_TYPE;

  @ApiPropertyOptional({ enum: GENDER, example: GENDER.OTHER })
  @IsOptional()
  gender?: GENDER;

  @ApiPropertyOptional({ enum: USER_STATUS, example: USER_STATUS.ACTIVE })
  @IsOptional()
  status: USER_STATUS;

  @ApiProperty({ enum: ROLE, example: ROLE.USER })
  @IsOptional()
  role: ROLE;
}
