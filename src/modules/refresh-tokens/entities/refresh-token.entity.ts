import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AbstractEntity } from '@/common/entities';

import { User } from '@/modules/users/entities/user.entity';

@Entity({ name: 'refresh_tokens' })
export class RefreshToken extends AbstractEntity {
  @Column()
  token: string;

  @Column({ nullable: true })
  replacedByToken: string;

  @ManyToOne(() => User, user => user.refreshTokens)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
