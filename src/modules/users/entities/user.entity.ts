import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractEntity } from '@/common/entities';

import { AUTH_PROVIDER, AUTH_TYPE } from '@/modules/auth/constants/auth.constant';
import { Event } from '@/modules/events/entities/event.entity';
import { Image } from '@/modules/images/entities/image.entity';
import { RefreshToken } from '@/modules/refresh-tokens/entities/refresh-token.entity';

@Entity({ name: 'users' })
export class User extends AbstractEntity {
  @Column({ nullable: true, type: 'varchar', length: 255 })
  name: string;

  @Column({ nullable: true, unique: true, type: 'varchar', length: 255 })
  email: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  @Exclude()
  password?: string;

  @Column({ nullable: true })
  providerAccountId?: string;

  @Column({ type: 'enum', enum: AUTH_PROVIDER, default: AUTH_PROVIDER.CREDENTIALS })
  provider: AUTH_PROVIDER;

  @Column({ type: 'enum', enum: AUTH_TYPE, default: AUTH_TYPE.CREDENTIALS })
  authType: AUTH_TYPE;

  @Column({ nullable: true })
  premium_date: Date;

  @Column({ type: 'bool', default: true, name: 'is_active' })
  isActive: boolean;

  @OneToMany(() => Event, event => event.author)
  events: Event[];

  @OneToMany(() => RefreshToken, refreshToken => refreshToken.user)
  refreshTokens: RefreshToken[];

  @OneToMany(() => Image, image => image.author)
  images: Image[];
}
