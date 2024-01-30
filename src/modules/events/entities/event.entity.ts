import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { AbstractEntity } from '@/common/entities';

import { RANDOM_TYPE } from '@/modules/randoms/constants/random.constant';
import { Random } from '@/modules/randoms/entities/random.entity';
import { User } from '@/modules/users/entities/user.entity';

@Entity({ name: 'events' })
export class Event extends AbstractEntity {
  @Column({ nullable: true, type: 'varchar', length: 255 })
  name: string;

  @OneToOne(() => Random)
  @JoinColumn()
  @Column({ type: 'enum', enum: RANDOM_TYPE })
  random_type: RANDOM_TYPE;

  @ManyToOne(() => User, user => user.events)
  author: User;
}
