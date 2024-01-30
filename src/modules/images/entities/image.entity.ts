import { Column, Entity, ManyToOne } from 'typeorm';

import { AbstractEntity } from '@/common/entities';

import { User } from '@/modules/users/entities/user.entity';

@Entity({ name: 'images' })
export class Image extends AbstractEntity {
  @Column({ nullable: true, type: 'varchar', length: 255 })
  src: string;

  @Column({ type: 'bool', default: true, name: 'is_active' })
  isActive: boolean;

  @ManyToOne(() => User, user => user.images)
  author: User;
}
