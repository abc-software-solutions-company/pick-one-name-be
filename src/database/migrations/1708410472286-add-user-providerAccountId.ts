import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserProviderAccountId1708410472286 implements MigrationInterface {
  name = 'AddUserProviderAccountId1708410472286';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "provider_account_id" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "provider_account_id"`);
  }
}
