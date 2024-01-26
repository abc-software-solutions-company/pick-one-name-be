import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { PaginationDto } from '@/common/dtos/pagination.dto';

import { Post } from '../entities/post.entity';

export class GetPostsDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Get posts successfully.' })
  message: string;

  @ApiProperty({
    type: 'array',
    example: [
      {
        id: '1322785b-2ceb-4aa2-8b38-54a9e024e5dc',
        name: 'This is title of post',
        slug: 'this-is-title-of-post',
        description: 'Short content here',
        body: 'Full content here',
        status: 'PUBLISHED',
        creator: {
          id: '29332240-8d2d-45ad-8bbe-8cfe5906b30a',
          name: 'Tin Tran'
        },
        createdAt: '2023-11-28T03:03:39.054Z',
        updatedAt: '2023-11-28T03:03:39.054Z'
      }
    ]
  })
  items: Post[];

  @ApiProperty({
    example: {
      paging: {
        currentPage: 1,
        itemsPerPage: 1,
        totalItems: 4,
        totalPages: 4
      }
    }
  })
  meta: {
    paging: PaginationDto;
  };
}
