import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFieldPlaneToTableUser1709620626991 implements MigrationInterface {
  name = 'AddFieldPlaneToTableUser1709620626991';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TYPE "public"."users_plane_enum" RENAME TO "users_plane_enum_old"`);
    await queryRunner.query(`CREATE TYPE "public"."users_plane_enum" AS ENUM('FREE', 'ONE_DAY', 'THREE_DAY')`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "plane" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "plane" TYPE "public"."users_plane_enum" USING "plane"::"text"::"public"."users_plane_enum"`
    );
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "plane" SET DEFAULT 'FREE'`);
    await queryRunner.query(`DROP TYPE "public"."users_plane_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."users_plane_enum_old" AS ENUM('FREE', 'ONE', 'COMBO')`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "plane" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "plane" TYPE "public"."users_plane_enum_old" USING "plane"::"text"::"public"."users_plane_enum_old"`
    );
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "plane" SET DEFAULT 'FREE'`);
    await queryRunner.query(`DROP TYPE "public"."users_plane_enum"`);
    await queryRunner.query(`ALTER TYPE "public"."users_plane_enum_old" RENAME TO "users_plane_enum"`);
  }
}
