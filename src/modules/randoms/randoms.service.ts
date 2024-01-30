import { Injectable } from '@nestjs/common';

import { CreateRandomDto } from './dto/create-random.dto';
import { UpdateRandomDto } from './dto/update-random.dto';

@Injectable()
export class RandomsService {
  create(createRandomDto: CreateRandomDto) {
    return 'This action adds a new random';
  }

  findAll() {
    return `This action returns all randoms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} random`;
  }

  update(id: number, updateRandomDto: UpdateRandomDto) {
    return `This action updates a #${id} random`;
  }

  remove(id: number) {
    return `This action removes a #${id} random`;
  }
}
