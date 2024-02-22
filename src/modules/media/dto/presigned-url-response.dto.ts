import { ApiProperty } from '@nestjs/swagger';

export class PresignedUrlResponseDto {
  @ApiProperty({
    type: String
  })
  readonly url: string;

  @ApiProperty({
    type: String
  })
  readonly key: string;
}
