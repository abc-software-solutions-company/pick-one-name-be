import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '@/common/entities';

import { JSONObject } from '@/common/interfaces';

@Entity({
  name: 'media'
})
export class MediaEntity extends AbstractEntity {
  @Column({
    type: 'varchar'
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: true
  })
  alt?: string;

  @Column({
    type: 'varchar',
    nullable: true
  })
  caption?: string;

  @Column({
    type: 'int4',
    nullable: true
  })
  width?: number;

  @Column({
    type: 'int4',
    nullable: true
  })
  height?: number;

  @Column({
    type: 'jsonb',
    nullable: true
  })
  formats?: JSONObject;

  @Column({
    type: 'varchar',
    nullable: true
  })
  hash?: string;

  @Column({
    type: 'varchar'
  })
  ext: string;

  @Column({
    type: 'varchar'
  })
  mime: string;

  @Column({
    type: 'int4',
    default: 0,
    nullable: true
  })
  size?: number;

  @Column({
    type: 'varchar'
  })
  url: string;

  @Column({
    type: 'boolean',
    default: true
  })
  isTemp?: boolean;
}
