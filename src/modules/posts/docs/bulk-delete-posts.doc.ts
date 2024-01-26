import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { Post } from '../entities/post.entity';

export class BulkDeletePostsDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Delete post successfully.' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      ids: ['bd0c37d2-fff1-4246-a293-544fac4cc23c', '579d6cb6-22e6-4521-a100-552d8b13e1ad']
    }
  })
  data: Post;
}
