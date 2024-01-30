import { Column, Entity, ManyToOne } from 'typeorm';

import { AbstractEntity } from '@/common/entities';

import { User } from '@/modules/users/entities/user.entity';

@Entity({ name: 'events' })
export class Event extends AbstractEntity {
  @Column({ nullable: true, type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'boolean', default: true })
  random_type: boolean;

  @ManyToOne(() => User, user => user.events)
  author: User;
}
