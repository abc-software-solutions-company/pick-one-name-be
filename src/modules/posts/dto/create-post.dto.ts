import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'This is title of post' })
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  slug: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  body?: string;
}
