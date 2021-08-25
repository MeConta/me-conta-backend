import { MigrationInterface, QueryRunner } from 'typeorm';

export class agendaJoins1629905528307 implements MigrationInterface {
  name = 'agendaJoins1629905528307';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."agenda" ADD "consultaId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."agenda" ADD CONSTRAINT "UQ_c161469d284714a3f9c23da5172" UNIQUE ("consultaId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."agenda" ADD CONSTRAINT "FK_c161469d284714a3f9c23da5172" FOREIGN KEY ("consultaId") REFERENCES "consulta"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."agenda" DROP CONSTRAINT "FK_c161469d284714a3f9c23da5172"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."agenda" DROP CONSTRAINT "UQ_c161469d284714a3f9c23da5172"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."agenda" DROP COLUMN "consultaId"`,
    );
  }
}
