import { Column, Entity, ManyToOne } from 'typeorm';

import { AbstractEntity } from '@/common/entities';

import { User } from '@/modules/users/entities/user.entity';

import { POST_STATUS } from '../constants/posts.constant';

@Entity({ name: 'posts' })
export class Post extends AbstractEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', unique: true, length: 255 })
  slug: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  body: string;

  @Column({ type: 'enum', enum: POST_STATUS, default: POST_STATUS.DRAFT })
  status: POST_STATUS;

  @ManyToOne(() => User, user => user.posts)
  creator: User;
}
