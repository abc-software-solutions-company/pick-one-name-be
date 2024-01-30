import { Module } from '@nestjs/common';

import { RandomsController } from './randoms.controller';
import { RandomsService } from './randoms.service';

@Module({
  controllers: [RandomsController],
  providers: [RandomsService]
})
export class RandomsModule {}
