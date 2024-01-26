import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: 'tindl88@gmail.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Tintran123@' })
  @IsNotEmpty()
  @IsString()
  @Length(6, 50, { message: 'password has to be at between 6 and 50 chars' })
  password: string;
}

export class SignOutDto {
  @ApiProperty({ example: '<TOKEN>' })
  @IsNotEmpty()
  @IsString()
  token: string;
}

export class OAuthSignInDto {
  @ApiProperty({ example: '<TOKEN>' })
  @IsNotEmpty()
  @IsString()
  token: string;
}
