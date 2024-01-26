import { MigrationInterface, QueryRunner } from 'typeorm';

import { User } from '@/modules/users/entities/user.entity';

import { userFactory } from '../factories/user.factory';

export class InitUser1689265344543 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(User).save(userFactory);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      userFactory.map(async (x: any) => {
        await queryRunner.manager.getRepository(User).remove(x);
      })
    );
  }
}
