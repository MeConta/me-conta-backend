import { MigrationInterface, QueryRunner } from 'typeorm';

export class AssociaAtendimentosASlotAgenda1642081801985
  implements MigrationInterface
{
  name = 'AssociaAtendimentosASlotAgenda1642081801985';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."atendimentos" DROP CONSTRAINT "FK_3f95aa1a5a0b5e015731dc4f0a9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."atendimentos" RENAME COLUMN "voluntarioId" TO "slotAgendaId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."atendimentos" ADD CONSTRAINT "FK_6ac4e68a18142564e3552ff546a" FOREIGN KEY ("slotAgendaId") REFERENCES "slot-agenda"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."atendimentos" DROP CONSTRAINT "FK_6ac4e68a18142564e3552ff546a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."atendimentos" RENAME COLUMN "slotAgendaId" TO "voluntarioId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."atendimentos" ADD CONSTRAINT "FK_3f95aa1a5a0b5e015731dc4f0a9" FOREIGN KEY ("voluntarioId") REFERENCES "voluntario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
