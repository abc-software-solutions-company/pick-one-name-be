import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Response, UUIDParam } from '@/common/decorators';

import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsService } from './events.service';

@Controller('events')
@ApiTags('Events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @Response({ message: 'Create event successfully.' })
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  @Response({ message: 'Get event successfully.' })
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @Response({ message: 'Get event successfully.' })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  @Response({ message: 'Update event successfully.' })
  update(@UUIDParam('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @Response({ message: 'Delete event successfully.' })
  softDelete(@Param('id') id: string) {
    return this.eventsService.softDelete(id);
  }
}
