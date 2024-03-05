import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFieldPlaneToTableUser1709614633956 implements MigrationInterface {
  name = 'AddFieldPlaneToTableUser1709614633956';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "premium_date" TO "plane"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "plane"`);
    await queryRunner.query(`CREATE TYPE "public"."users_plane_enum" AS ENUM('FREE', 'ONE', 'COMBO')`);
    await queryRunner.query(`ALTER TABLE "users" ADD "plane" "public"."users_plane_enum" NOT NULL DEFAULT 'FREE'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "plane"`);
    await queryRunner.query(`DROP TYPE "public"."users_plane_enum"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "plane" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "plane" TO "premium_date"`);
  }
}
