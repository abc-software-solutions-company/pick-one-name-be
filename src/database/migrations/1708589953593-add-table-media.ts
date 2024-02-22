import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableMedia1708589953593 implements MigrationInterface {
  name = 'AddTableMedia1708589953593';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "folder" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "name" character varying NOT NULL, "path" character varying NOT NULL, "mpath" character varying DEFAULT '', "parent_id" uuid, CONSTRAINT "PK_6278a41a706740c94c02e288df8" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "name" character varying NOT NULL, "alt" character varying, "caption" character varying, "width" integer, "height" integer, "formats" jsonb, "hash" character varying, "ext" character varying NOT NULL, "mime" character varying NOT NULL, "size" integer DEFAULT '0', "url" character varying NOT NULL, "is_temp" boolean NOT NULL DEFAULT true, "folder_id" uuid, CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "folder" ADD CONSTRAINT "FK_8b06efa8280c9d33719b9286876" FOREIGN KEY ("parent_id") REFERENCES "folder"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "media" ADD CONSTRAINT "FK_e4f16e3dcba4e4995197e36e707" FOREIGN KEY ("folder_id") REFERENCES "folder"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_e4f16e3dcba4e4995197e36e707"`);
    await queryRunner.query(`ALTER TABLE "folder" DROP CONSTRAINT "FK_8b06efa8280c9d33719b9286876"`);
    await queryRunner.query(`DROP TABLE "media"`);
    await queryRunner.query(`DROP TABLE "folder"`);
  }
}
