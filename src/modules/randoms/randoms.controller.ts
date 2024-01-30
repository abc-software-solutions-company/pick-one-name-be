import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateRandomDto } from './dto/create-random.dto';
import { UpdateRandomDto } from './dto/update-random.dto';
import { RandomsService } from './randoms.service';

@ApiTags('Random Types')
@Controller('random-types')
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

  @ApiOperation({ summary: 'Get all random types' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.randomsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRandomDto: UpdateRandomDto) {
    return this.randomsService.update(id, updateRandomDto);
  }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.randomsService.softDelete(id);
  }
}
