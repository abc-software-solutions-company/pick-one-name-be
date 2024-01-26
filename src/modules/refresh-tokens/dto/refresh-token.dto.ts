import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({ example: '<TOKEN>' })
  @IsNotEmpty()
  token: string;
}
