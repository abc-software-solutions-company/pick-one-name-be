import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDataRandomTypes1708568697094 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO "random-types" (type) VALUES('NUMBER'), ('WHEEL');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "random-types" WHERE type IN ('NUMBER', 'WHEEL');`);
  }
}
