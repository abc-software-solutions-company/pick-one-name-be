import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsactiveTableEvents1706683098047 implements MigrationInterface {
  name = 'AddIsactiveTableEvents1706683098047';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "events" ADD "is_active" boolean NOT NULL DEFAULT true`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "is_active"`);
  }
}
