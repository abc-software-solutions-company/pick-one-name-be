import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropTableMediaAndTableImages1708998855180 implements MigrationInterface {
  name = 'DropTableMediaAndTableImages1708998855180';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_e4f16e3dcba4e4995197e36e707"`);
    await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "folder_id"`);
    await queryRunner.query(`DROP TABLE IF EXISTS folder, images`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "media" ADD "folder_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "media" ADD CONSTRAINT "FK_e4f16e3dcba4e4995197e36e707" FOREIGN KEY ("folder_id") REFERENCES "folder"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }
}
