import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Image } from './entities/image.entity';
import { ImagesController } from './images.controller';
import { ImagesRepo } from './images.repository';
import { ImagesService } from './images.service';

@Module({
  imports: [TypeOrmModule.forFeature([Image]), ImagesModule],
  controllers: [ImagesController],
  providers: [ImagesService, ImagesRepo],
  exports: [ImagesService]
})
export class ImagesModule {}
