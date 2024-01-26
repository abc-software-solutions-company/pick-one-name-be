import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { ApiDocumentResponse, PaginatedResponse, Response, UUIDParam } from '@/common/decorators';

import { BulkDeletePostsDoc } from './docs/bulk-delete-posts.doc';
import { CreatePostDoc } from './docs/create-post.doc';
import { DeletePostDoc } from './docs/delete-post.doc';
import { GetPostDoc } from './docs/get-post.doc';
import { GetPostsDoc } from './docs/get-posts.doc';
import { UpdatePostDoc } from './docs/update-post.doc';
import { BulkDeletePostDto } from './dto/bulk-delete-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { FilterPostDto } from './dto/filter-posts.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

import { AccessTokenGuard } from '../auth/guards/access-token.guard';

@Controller('posts')
@ApiTags('Posts')
@UseGuards(AccessTokenGuard)
@ApiBearerAuth('accessToken')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({ summary: 'Create post.' })
  @ApiDocumentResponse({ status: HttpStatus.CREATED, message: 'Create post successfully.', model: CreatePostDoc })
  @Response({ message: 'Create post successfully.' })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get posts.' })
  @ApiDocumentResponse({ message: 'Get posts successfully.', model: GetPostsDoc })
  @PaginatedResponse({ message: 'Get posts successfully.' })
  find(@Query() filterPostDto: FilterPostDto) {
    return this.postsService.find(filterPostDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get post.' })
  @ApiDocumentResponse({ message: 'Get post successfully.', model: GetPostDoc })
  @Response({ message: 'Get post successfully.' })
  @ApiParam({ name: 'id', example: '1322785b-2ceb-4aa2-8b38-54a9e024e5dc' })
  findOne(@UUIDParam('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Get('.by.slug/:slug')
  @ApiOperation({ summary: 'Get post by slug.' })
  @ApiDocumentResponse({ message: 'Get post successfully.', model: GetPostDoc })
  @Response({ message: 'Get post successfully.' })
  @ApiParam({ name: 'slug', example: 'this-is-title-of-post' })
  findBySlug(@Param('slug') slug: string) {
    return this.postsService.findBySlug(slug);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update post.' })
  @ApiDocumentResponse({ message: 'Update post successfully.', model: UpdatePostDoc })
  @Response({ message: 'Update post successfully.' })
  @ApiParam({ name: 'id', example: '1322785b-2ceb-4aa2-8b38-54a9e024e5dc' })
  update(@UUIDParam('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete post.' })
  @ApiDocumentResponse({ message: 'Delete post successfully.', model: DeletePostDoc })
  @Response({ message: 'Delete post successfully.' })
  @ApiParam({ name: 'id', example: '1322785b-2ceb-4aa2-8b38-54a9e024e5dc' })
  remove(@UUIDParam('id') id: string) {
    return this.postsService.remove(id);
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Delete multiple posts.' })
  @Response({ message: 'Delete posts successfully.' })
  @ApiDocumentResponse({ message: 'Delete post successfully.', model: BulkDeletePostsDoc })
  @HttpCode(HttpStatus.OK)
  bulkDelete(@Body() bulkDeletePostDto: BulkDeletePostDto) {
    return this.postsService.bulkDelete(bulkDeletePostDto);
  }
}
