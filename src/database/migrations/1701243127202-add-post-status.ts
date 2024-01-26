import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPostStatus1701243127202 implements MigrationInterface {
  name = 'AddPostStatus1701243127202';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."posts_status_enum" AS ENUM('PUBLISHED', 'DRAFT', 'DELETED')`);
    await queryRunner.query(`ALTER TABLE "posts" ADD "status" "public"."posts_status_enum" NOT NULL DEFAULT 'DRAFT'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."posts_status_enum"`);
  }
}
