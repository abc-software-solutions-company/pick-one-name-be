import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginationDto } from '@/common/dtos/pagination.dto';
import { PaginationResponseDto } from '@/common/dtos/pagination-response.dto';

import { POST_STATUS } from './constants/posts.constant';
import { BulkDeletePostDto } from './dto/bulk-delete-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { FilterPostDto } from './dto/filter-posts.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>
  ) {}

  create(createPostDto: CreatePostDto) {
    const post = this.postRepository.create(createPostDto);

    return this.postRepository.save(post);
  }

  async find(filterDto: FilterPostDto) {
    const { q, status } = filterDto;

    const fields =
      'post.id post.name post.slug post.description post.body post.status post.createdAt user.id user.name';

    const queryBuilder = this.postRepository
      .createQueryBuilder('post')
      .select(fields.split(' '))
      .leftJoin('post.creator', 'user');
    // .orderBy(`post.${sort}`, order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');

    if (status) queryBuilder.where('post.status = :status', { status });
    if (q) queryBuilder.andWhere('post.name LIKE :q', { q: `%${q}%` });

    queryBuilder.skip(filterDto.skip).take(filterDto.limit);

    const totalItems = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const paginationDto = new PaginationDto({ totalItems, filterDto });

    return new PaginationResponseDto(entities, { paging: paginationDto });
  }

  async findOne(id: string) {
    const post = await this.postRepository.findOneBy({ id });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async findBySlug(slug: string) {
    const post = await this.postRepository.findOneBy({ slug });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.preload({ id: id, ...updatePostDto });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.postRepository.save(post);
  }

  async remove(id: string) {
    const post = await this.postRepository.findOneBy({ id });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    post.status = POST_STATUS.DELETED;

    return this.postRepository.save(post);
  }

  async bulkDelete(bulkDeletePostDto: BulkDeletePostDto) {
    if (!bulkDeletePostDto.ids.length) {
      throw new NotFoundException('There is no post id to remove');
    }

    const queryBuilder = this.postRepository
      .createQueryBuilder()
      .update(Post)
      .set({ status: POST_STATUS.DELETED })
      .whereInIds(bulkDeletePostDto.ids);

    await queryBuilder.execute();

    return {
      ids: bulkDeletePostDto.ids
    };
  }
}
