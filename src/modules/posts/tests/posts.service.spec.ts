import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Post } from '../entities/post.entity';
import { PostsService } from '../posts.service';

describe('PostsService', () => {
  let service: PostsService;
  let repository: Repository<Post>;

  const mockPostRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    preload: jest.fn(),
    remove: jest.fn()
  };

  beforeEach(async () => {
    jest.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: mockPostRepository
        }
      ]
    }).compile();

    service = module.get<PostsService>(PostsService);
    repository = module.get<Repository<Post>>(getRepositoryToken(Post));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a post', async () => {
      const createPostDto = { name: 'NestJS', slug: 'nestjs', description: 'short', body: 'full' } as CreatePostDto;
      const post = { name: 'NestJS', slug: 'nestjs', description: 'short', body: 'full' } as Post;
      const createSpy = jest.spyOn(repository, 'create').mockReturnValue(post);
      const saveSpy = jest.spyOn(repository, 'save').mockResolvedValue(post);

      const result = await service.create(createPostDto);

      expect(createSpy).toHaveBeenCalledWith(createPostDto);
      expect(saveSpy).toHaveBeenCalledWith(post);
      expect(result).toEqual(post);
    });
  });

  describe('findOne', () => {
    it('should find a post by ID', async () => {
      const postId = '2';
      const post = { name: 'NestJS', slug: 'nestjs', description: 'short', body: 'full' } as Post;
      const findOneBySpy = jest.spyOn(repository, 'findOneBy').mockResolvedValue(post);

      const result = await service.findOne(postId);

      expect(findOneBySpy).toHaveBeenCalledWith({ id: postId });
      expect(result).toEqual(post);
    });

    it('should throw NotFoundException if post is not found', async () => {
      const postId = 'non-existent-id';

      mockPostRepository.findOneBy.mockResolvedValue(undefined);
      const findOneBySpy = jest.spyOn(repository, 'findOneBy').mockResolvedValue(undefined);

      await expect(service.findOne(postId)).rejects.toThrow(NotFoundException);
      expect(findOneBySpy).toHaveBeenCalledWith({ id: postId });
    });
  });

  describe('findBySlug', () => {
    it('should find a post by SLUG', async () => {
      const postSlug = 'post-1';
      const post = new Post();
      const findOneBySpy = jest.spyOn(repository, 'findOneBy').mockResolvedValue(post);

      const result = await service.findBySlug(postSlug);

      expect(findOneBySpy).toHaveBeenCalledWith({ slug: postSlug });
      expect(result).toEqual(post);
    });

    it('should throw NotFoundException if post is not found', async () => {
      const postSlug = 'non-existent-slug';
      const findOneBySpy = jest.spyOn(repository, 'findOneBy').mockResolvedValue(undefined);

      await expect(service.findBySlug(postSlug)).rejects.toThrow(NotFoundException);
      expect(findOneBySpy).toHaveBeenCalledWith({ slug: postSlug });
    });
  });

  describe('update', () => {
    it('should update a post', async () => {
      const postId = 'some-id';
      const updatePostDto: UpdatePostDto = { name: 'NestJS', slug: 'nestjs', description: 'short', body: 'full' };
      const originalPost = new Post();
      const updatedPost = new Post();
      const preloadSpy = jest.spyOn(repository, 'preload').mockResolvedValue(originalPost);
      const saveSpy = jest.spyOn(repository, 'save').mockResolvedValue(updatedPost);

      const result = await service.update(postId, updatePostDto);

      expect(preloadSpy).toHaveBeenCalledWith({ id: postId, ...updatePostDto });
      expect(saveSpy).toHaveBeenCalledWith(updatedPost);
      expect(result).toEqual(updatedPost);
    });

    it('should throw NotFoundException if post is not found', async () => {
      const postId = 'non-existent-id';
      const updatePostDto: UpdatePostDto = { name: 'NestJS', slug: 'nestjs', description: 'short', body: 'full' };
      const preloadSpy = jest.spyOn(repository, 'preload').mockResolvedValue(undefined);

      await expect(service.update(postId, updatePostDto)).rejects.toThrow(NotFoundException);
      expect(preloadSpy).toHaveBeenCalledWith({ id: postId, ...updatePostDto });
    });
  });

  describe('remove', () => {
    it('should throw NotFoundException if post is not found', async () => {
      const postId = 'non-existent-id';

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(undefined);

      await expect(service.remove(postId)).rejects.toThrow(NotFoundException);
    });
  });
});
