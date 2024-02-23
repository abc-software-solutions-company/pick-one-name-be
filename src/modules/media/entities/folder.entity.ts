import { Column, Entity, OneToMany, Tree, TreeChildren, TreeParent } from 'typeorm';

import { AbstractEntity } from '@/common/entities';

import { MediaEntity } from './media.entity';

@Entity({
  name: 'folder'
})
@Tree('materialized-path')
export class FolderEntity extends AbstractEntity {
  @Column({
    type: 'varchar'
  })
  name: string;

  @Column({
    type: 'varchar'
  })
  path: string;

  @OneToMany(() => MediaEntity, media => media.folder)
  files?: MediaEntity[];

  @TreeChildren()
  children: FolderEntity[];

  @TreeParent()
  parent: FolderEntity;
}
