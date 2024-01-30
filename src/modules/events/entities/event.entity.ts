import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { AbstractEntity } from '@/common/entities';

import { Random } from '@/modules/randoms/entities/random.entity';
import { User } from '@/modules/users/entities/user.entity';

@Entity({ name: 'events' })
export class Event extends AbstractEntity {
  @Column({ nullable: true, type: 'varchar', length: 255 })
  name: string;

  @OneToOne(() => Random)
  @JoinColumn()
  random: Random;

  @ManyToOne(() => User, user => user.events)
  author: User;
}
