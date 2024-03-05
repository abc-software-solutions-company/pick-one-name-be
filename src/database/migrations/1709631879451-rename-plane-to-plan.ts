import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenamePlaneToPlan1709631879451 implements MigrationInterface {
  name = 'RenamePlaneToPlan1709631879451';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "plane" TO "plan"`);
    await queryRunner.query(`ALTER TYPE "public"."users_plane_enum" RENAME TO "users_plan_enum"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TYPE "public"."users_plan_enum" RENAME TO "users_plane_enum"`);
    await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "plan" TO "plane"`);
  }
}
