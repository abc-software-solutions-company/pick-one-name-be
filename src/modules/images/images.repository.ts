import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';

@Injectable()
export class ImagesRepo {
  constructor(
    @InjectRepository(Image)
    private readonly image: Repository<Image>
  ) {}

  async findAll(): Promise<Image[]> {
    return await this.image.find();
  }

  async findOne(id: string): Promise<Image> {
    return await this.image.findOne({ where: { id } });
  }

  async create(image: CreateImageDto): Promise<Image> {
    const imageCreated = await this.image.save(Image);

    if (!imageCreated) {
      throw new BadRequestException(`Image #${image.src} create failed`);
    }

    return imageCreated;
  }

  async update(id: string, updateRandomDto: UpdateImageDto) {
    const image = await this.image.update(id, { ...updateRandomDto });

    if (!image) {
      throw new NotFoundException(`Image #${id} not found`);
    }

    return image;
  }

  async softDelete(id: string): Promise<boolean> {
    const result = await this.image.update(id, { isActive: false });

    return result && result.affected > 0 ? true : false;
  }
}
