import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlteraAtendimentos1641434953779 implements MigrationInterface {
  name = 'AlteraAtendimentos1641434953779';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."atendimentos" DROP COLUMN "data"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."atendimentos" ADD "anotacoes" text NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."atendimentos" DROP COLUMN "anotacoes"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."atendimentos" ADD "data" TIMESTAMP NOT NULL`,
    );
  }
}
