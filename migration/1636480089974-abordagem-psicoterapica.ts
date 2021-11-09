import { MigrationInterface, QueryRunner } from 'typeorm';

export class abordagemPsicoterapica1636480089974 implements MigrationInterface {
  name = 'abordagemPsicoterapica1636480089974';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."voluntario" ADD "abordagem" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."voluntario" DROP COLUMN "abordagem"`,
    );
  }
}
