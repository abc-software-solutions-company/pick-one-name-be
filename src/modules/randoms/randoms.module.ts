import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RandomType } from './entities/random.entity';
import { RandomsController } from './randoms.controller';
import { RandomsRepo } from './randoms.repository';
import { RandomsService } from './randoms.service';

@Module({
  imports: [TypeOrmModule.forFeature([RandomType]), RandomsModule],
  controllers: [RandomsController],
  providers: [RandomsService, RandomsRepo],
  exports: [RandomsService]
})
export class RandomsModule {}
