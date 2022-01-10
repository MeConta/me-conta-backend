import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlteraAtendimentos1641835086884 implements MigrationInterface {
  name = 'AlteraAtendimentos1641835086884';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."atendimentos" ALTER COLUMN "anotacoes" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."atendimentos" ALTER COLUMN "anotacoes" SET NOT NULL`,
    );
  }
}
