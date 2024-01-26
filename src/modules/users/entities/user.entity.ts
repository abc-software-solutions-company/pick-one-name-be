import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractEntity } from '@/common/entities';

import { AUTH_PROVIDER, AUTH_TYPE } from '@/modules/auth/constants/auth.constant';
import { Post } from '@/modules/posts/entities/post.entity';
import { RefreshToken } from '@/modules/refresh-tokens/entities/refresh-token.entity';

import { GENDER, ROLE, USER_STATUS } from '../constants/users.constant';

@Entity({ name: 'users' })
export class User extends AbstractEntity {
  @Column({ nullable: true, type: 'varchar', length: 255 })
  name: string;

  @Column({ nullable: true, unique: true, type: 'varchar', length: 255 })
  email: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  @Exclude()
  password?: string;

  @Column({ nullable: true })
  emailVerified?: boolean;

  @Column({ nullable: true })
  locale?: string;

  @Column({ type: 'timestamp without time zone', nullable: true })
  lastLogin?: Date;

  @Column({ nullable: true })
  providerAccountId?: string;

  @Column({ type: 'enum', enum: AUTH_PROVIDER, default: AUTH_PROVIDER.CREDENTIALS })
  provider: AUTH_PROVIDER;

  @Column({ type: 'enum', enum: AUTH_TYPE, default: AUTH_TYPE.CREDENTIALS })
  authType: AUTH_TYPE;

  @Column({ type: 'enum', enum: GENDER, default: GENDER.MALE })
  gender: GENDER;

  @Column({ type: 'enum', enum: USER_STATUS, default: USER_STATUS.INACTIVE })
  status: USER_STATUS;

  @Column({ type: 'enum', enum: ROLE, default: ROLE.USER })
  role: ROLE;

  @OneToMany(() => Post, post => post.creator)
  posts: Post[];

  @OneToMany(() => RefreshToken, refreshToken => refreshToken.user)
  refreshTokens: RefreshToken[];
}
