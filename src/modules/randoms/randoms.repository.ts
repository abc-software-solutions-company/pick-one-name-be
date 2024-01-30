import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateRandomDto } from './dto/create-random.dto';
import { UpdateRandomDto } from './dto/update-random.dto';
import { RandomType } from './entities/random.entity';

@Injectable()
export class RandomsRepo {
  constructor(
    @InjectRepository(RandomType)
    private readonly randomType: Repository<RandomType>
  ) {}

  async findAll(): Promise<RandomType[]> {
    return await this.randomType.find();
  }

  async findOne(id: string): Promise<RandomType> {
    return await this.randomType.findOne({ where: { id } });
  }

  async create(randomType: CreateRandomDto): Promise<RandomType> {
    const randomTypeCreated = await this.randomType.save(randomType);

    if (!randomTypeCreated) {
      throw new BadRequestException(`RandomType #${randomType.type} create failed`);
    }

    return randomTypeCreated;
  }

  async update(id: string, updateRandomDto: UpdateRandomDto) {
    const randomType = await this.randomType.update(id, { ...updateRandomDto });

    if (!randomType) {
      throw new NotFoundException(`RandomType #${id} not found`);
    }

    return randomType;
  }

  async softDelete(id: string): Promise<boolean> {
    const result = await this.randomType.update(id, { is_active: false });

    return result && result.affected > 0 ? true : false;
  }
}
