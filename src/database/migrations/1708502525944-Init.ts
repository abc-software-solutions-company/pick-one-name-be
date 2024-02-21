import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1708502525944 implements MigrationInterface {
  name = 'Init1708502525944';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "random-types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "type" "public"."random-types_type_enum" NOT NULL DEFAULT 'NUMBER', "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_c6add311320ff6f4de550c74bfb" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "name" character varying(255), "is_active" boolean NOT NULL DEFAULT true, "random_id" uuid, "author_id" uuid, CONSTRAINT "REL_3b0bb3ade2731761148d9cf00a" UNIQUE ("random_id"), CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "refresh_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "token" character varying NOT NULL, "replaced_by_token" character varying, "user_id" uuid, CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "name" character varying(255), "email" character varying(255), "avatar" character varying, "password" character varying, "provider_account_id" character varying, "provider" "public"."users_provider_enum" NOT NULL DEFAULT 'CREDENTIALS', "auth_type" "public"."users_auth_type_enum" NOT NULL DEFAULT 'CREDENTIALS', "premium_date" TIMESTAMP, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "src" character varying(255), "is_active" boolean NOT NULL DEFAULT true, "author_id" uuid, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_3b0bb3ade2731761148d9cf00af" FOREIGN KEY ("random_id") REFERENCES "random-types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_389b662d0b626b48a1ce4e2c8f8" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "images" ADD CONSTRAINT "FK_b20837d0bf5efd62df823e007f6" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_b20837d0bf5efd62df823e007f6"`);
    await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4"`);
    await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_389b662d0b626b48a1ce4e2c8f8"`);
    await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_3b0bb3ade2731761148d9cf00af"`);
    await queryRunner.query(`DROP TABLE "images"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "refresh_tokens"`);
    await queryRunner.query(`DROP TABLE "events"`);
    await queryRunner.query(`DROP TABLE "random-types"`);
  }
}
