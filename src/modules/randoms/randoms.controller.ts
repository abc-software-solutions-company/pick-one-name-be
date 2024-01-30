import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateRandomDto } from './dto/create-random.dto';
import { UpdateRandomDto } from './dto/update-random.dto';
import { RandomsService } from './randoms.service';

@Controller('randoms')
export class RandomsController {
  constructor(private readonly randomsService: RandomsService) {}

  @Post()
  create(@Body() createRandomDto: CreateRandomDto) {
    return this.randomsService.create(createRandomDto);
  }

  @Get()
  findAll() {
    return this.randomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.randomsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRandomDto: UpdateRandomDto) {
    return this.randomsService.update(+id, updateRandomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.randomsService.remove(+id);
  }
}
