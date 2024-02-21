import { Injectable } from '@nestjs/common';

import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ImagesRepo } from './images.repository';

@Injectable()
export class ImagesService {
  constructor(private readonly imageRepo: ImagesRepo) {}

  async create(createImageDto: CreateImageDto) {
    return await this.imageRepo.create(createImageDto);
  }

  async findAll() {
    return await this.imageRepo.findAll();
  }

  async findOne(id: string) {
    return await this.imageRepo.findOne(id);
  }

  async update(id: string, updateImageDto: UpdateImageDto) {
    return await this.imageRepo.update(id, updateImageDto);
  }

  async softDelete(id: string) {
    return await this.imageRepo.softDelete(id);
  }
}
