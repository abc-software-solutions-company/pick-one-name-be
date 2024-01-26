import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPostCreator1701341207878 implements MigrationInterface {
  name = 'AddPostCreator1701341207878';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" ADD "creator_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_c810f0ccb5f80b289391454d4ad" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_c810f0ccb5f80b289391454d4ad"`);
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "creator_id"`);
  }
}
