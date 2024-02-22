import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddValuesWheelTableRandomtypes1708567559178 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO "random-types" (type) VALUES('WHEEL');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "random-types" WHERE type = 'WHEEL';`);
  }
}
