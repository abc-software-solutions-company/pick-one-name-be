import { Module } from '@nestjs/common';
import { RandomsService } from './randoms.service';
import { RandomsController } from './randoms.controller';

@Module({
  controllers: [RandomsController],
  providers: [RandomsService]
})
export class RandomsModule {}
