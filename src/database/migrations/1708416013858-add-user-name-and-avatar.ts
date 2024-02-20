import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserNameAndAvatar1708416013858 implements MigrationInterface {
  name = 'AddUserNameAndAvatar1708416013858';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying(255)`);
    await queryRunner.query(`ALTER TABLE "users" ADD "avatar" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
  }
}
