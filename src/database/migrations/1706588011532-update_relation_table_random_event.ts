import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRelationTableRandomEvent1706588011532 implements MigrationInterface {
  name = 'UpdateRelationTableRandomEvent1706588011532';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "events" ADD "random_type_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "UQ_26b80106cd48091c49af065e66b" UNIQUE ("random_type_id")`
    );
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "random_type"`);
    await queryRunner.query(`CREATE TYPE "public"."events_random_type_enum" AS ENUM('NUMBER', 'WHEEL')`);
    await queryRunner.query(`ALTER TABLE "events" ADD "random_type" "public"."events_random_type_enum" NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_26b80106cd48091c49af065e66b" FOREIGN KEY ("random_type_id") REFERENCES "randoms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_26b80106cd48091c49af065e66b"`);
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "random_type"`);
    await queryRunner.query(`DROP TYPE "public"."events_random_type_enum"`);
    await queryRunner.query(`ALTER TABLE "events" ADD "random_type" boolean NOT NULL DEFAULT true`);
    await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "UQ_26b80106cd48091c49af065e66b"`);
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "random_type_id"`);
  }
}