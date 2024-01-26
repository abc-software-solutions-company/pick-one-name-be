import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserAgentFingerPrintToRefreshToken1701661191728 implements MigrationInterface {
  name = 'AddUserAgentFingerPrintToRefreshToken1701661191728';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD "user_agent" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD "finger_print" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP COLUMN "finger_print"`);
    await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP COLUMN "user_agent"`);
  }
}
