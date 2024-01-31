import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Response } from '@/common/decorators';

import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ImagesService } from './images.service';

@Controller('images')
@ApiTags('Images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @Response({ message: 'Create image successfully.' })
  create(@Body() createImageDto: CreateImageDto) {
    return this.imagesService.create(createImageDto);
  }

  @Get()
  @Response({ message: 'Get image successfully.' })
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  @Response({ message: 'Get image successfully.' })
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(id);
  }

  @Patch(':id')
  @Response({ message: 'Update image successfully.' })
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(id, updateImageDto);
  }

  @Delete(':id')
  @Response({ message: 'Delete image successfully.' })
  softDelete(@Param('id') id: string) {
    return this.imagesService.softDelete(id);
  }
}
