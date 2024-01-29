import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '@/common/entities';

import { RANDOM_TYPE } from '../constants/random.constant';

@Entity({ name: 'randoms' })
export class Random extends AbstractEntity {
  @Column({ type: 'enum', enum: RANDOM_TYPE, default: RANDOM_TYPE.NUMBER })
  type: RANDOM_TYPE;

  @Column({ type: 'bool', default: true })
  is_active: boolean;
}
