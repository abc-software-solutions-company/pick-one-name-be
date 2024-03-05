import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropFieldPlane1709622622738 implements MigrationInterface {
  name = 'DropFieldPlane1709622622738';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "plane"`);
    await queryRunner.query(`DROP TYPE "public"."users_plane_enum"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."users_plane_enum" AS ENUM('FREE', 'ONE_DAY', 'THREE_DAY')`);
    await queryRunner.query(`ALTER TABLE "users" ADD "plane" "public"."users_plane_enum" NOT NULL DEFAULT 'FREE'`);
  }
}
