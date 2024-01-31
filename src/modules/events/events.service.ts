import { Injectable } from '@nestjs/common';

import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsRepo } from './events.repository';

@Injectable()
export class EventsService {
  constructor(private readonly eventRepo: EventsRepo) {}

  async create(createEventDto: CreateEventDto) {
    return await this.eventRepo.create(createEventDto);
  }

  async findAll() {
    return await this.eventRepo.findAll();
  }

  async findOne(id: string) {
    return await this.eventRepo.findOne(id);
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    return await this.eventRepo.update(id, updateEventDto);
  }

  softDelete(id: string) {
    return this.eventRepo.softDelete(id);
  }
}
