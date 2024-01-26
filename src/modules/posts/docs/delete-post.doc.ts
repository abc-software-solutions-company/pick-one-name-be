import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { Post } from '../entities/post.entity';

export class DeletePostDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Delete post successfully.' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      id: '1322785b-2ceb-4aa2-8b38-54a9e024e5dc',
      name: 'This is title of post',
      slug: 'this-is-title-of-post',
      description: 'Short content here',
      body: 'Full content here',
      status: 'DELETED',
      createdAt: '2023-11-28T03:03:39.054Z',
      updatedAt: '2023-11-28T03:03:39.054Z'
    }
  })
  data: Post;
}
