import { Injectable } from '@nestjs/common';

import { CreateRandomDto } from './dto/create-random.dto';
import { UpdateRandomDto } from './dto/update-random.dto';
import { RandomsRepo } from './randoms.repository';

@Injectable()
export class RandomsService {
  constructor(private readonly randomRepo: RandomsRepo) {}

  async findAll() {
    return await this.randomRepo.findAll();
  }

  async findOne(id: string) {
    return await this.randomRepo.findOne(id);
  }

  async create(randomType: CreateRandomDto) {
    return await this.randomRepo.create(randomType);
  }

  async update(id: string, updateRandomDto: UpdateRandomDto) {
    return await this.randomRepo.update(id, updateRandomDto);
  }

  async softDelete(id: string) {
    return await this.randomRepo.softDelete(id);
  }
}
