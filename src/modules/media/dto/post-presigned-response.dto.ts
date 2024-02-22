import { ApiProperty } from '@nestjs/swagger';

import { JSONObject } from '@/common/interfaces';

import { MediaEntity } from '../entities/media.entity';

export class PostPresignedResponseDto {
  @ApiProperty({
    type: String
  })
  readonly url: string;

  @ApiProperty()
  readonly fields: JSONObject;

  @ApiProperty({
    type: MediaEntity
  })
  readonly file: MediaEntity;
}
