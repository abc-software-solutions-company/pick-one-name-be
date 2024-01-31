import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Event } from './entities/event.entity';
import { EventsController } from './events.controller';
import { EventsRepo } from './events.repository';
import { EventsService } from './events.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), EventsModule],
  controllers: [EventsController],
  providers: [EventsService, EventsRepo],
  exports: [EventsService]
})
export class EventsModule {}
