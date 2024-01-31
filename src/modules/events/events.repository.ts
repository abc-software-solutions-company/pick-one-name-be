import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsRepo {
  constructor(
    @InjectRepository(Event)
    private readonly events: Repository<Event>
  ) {}

  async findAll(): Promise<Event[]> {
    return await this.events.find({
      where: {
        isActive: true
      }
    });
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.events.findOne({ where: { id, isActive: true } });

    if (!event) throw new NotFoundException(`Event #${id} not found`);

    return event;
  }

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const eventCreated = await this.events.save(createEventDto);

    if (!eventCreated) {
      throw new BadRequestException(`Event #${createEventDto.name} create failed`);
    }

    return eventCreated;
  }

  async update(id: string, updateRandomDto: UpdateEventDto) {
    const eventUpdated = await this.events.update(id, { ...updateRandomDto });

    if (!eventUpdated) {
      throw new NotFoundException(`Event #${id} not found`);
    }

    return eventUpdated;
  }

  async softDelete(id: string): Promise<boolean> {
    const result = await this.events.update(id, { isActive: false });

    return result && result.affected > 0 ? true : false;
  }
}
