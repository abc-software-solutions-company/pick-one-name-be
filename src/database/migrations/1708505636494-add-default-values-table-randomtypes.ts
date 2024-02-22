import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDefaultValuesTableRandomtypes1708505636494 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO "random-types" (type) VALUES('NUMBER');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "random-types" WHERE type = 'NUMBER';`);
  }
}
