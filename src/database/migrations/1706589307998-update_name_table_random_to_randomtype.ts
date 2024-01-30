import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateNameTableRandomToRandomtype1706589307998 implements MigrationInterface {
  name = 'UpdateNameTableRandomToRandomtype1706589307998';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_3b0bb3ade2731761148d9cf00af"`);
    await queryRunner.query(`CREATE TYPE "public"."random-types_type_enum" AS ENUM('NUMBER', 'WHEEL')`);
    await queryRunner.query(
      `CREATE TABLE "random-types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "type" "public"."random-types_type_enum" NOT NULL DEFAULT 'NUMBER', "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_c6add311320ff6f4de550c74bfb" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_3b0bb3ade2731761148d9cf00af" FOREIGN KEY ("random_id") REFERENCES "random-types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_3b0bb3ade2731761148d9cf00af"`);
    await queryRunner.query(`DROP TABLE "random-types"`);
    await queryRunner.query(`DROP TYPE "public"."random-types_type_enum"`);
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_3b0bb3ade2731761148d9cf00af" FOREIGN KEY ("random_id") REFERENCES "randoms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
