import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveFieldDeletedAt1701661702025 implements MigrationInterface {
  name = 'RemoveFieldDeletedAt1701661702025';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "deleted_at"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD "deleted_at" TIMESTAMP`);
  }
}
