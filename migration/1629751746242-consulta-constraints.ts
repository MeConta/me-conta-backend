import { MigrationInterface, QueryRunner } from 'typeorm';

export class consultaConstraints1629751746242 implements MigrationInterface {
  name = 'consultaConstraints1629751746242';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."supervisor" DROP CONSTRAINT "FK_dbf714549b6687c483773e14024"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."supervisor" ALTER COLUMN "aprovado" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."supervisor" ALTER COLUMN "usuarioId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."atendente" DROP CONSTRAINT "FK_2727edd094237a1c1a1a6ebcd3a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."atendente" ALTER COLUMN "aprovado" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."atendente" ALTER COLUMN "usuarioId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."consulta" DROP CONSTRAINT "FK_6b678cfda2b959923a91de5d9a0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."consulta" DROP CONSTRAINT "FK_4031e5f37ca2454252328df45a3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."consulta" DROP CONSTRAINT "FK_9ba0fd5a307d333a3330e45a0d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."consulta" ALTER COLUMN "atendenteId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."consulta" ALTER COLUMN "alunoId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."consulta" ALTER COLUMN "agendaId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."supervisor" ADD CONSTRAINT "FK_dbf714549b6687c483773e14024" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."atendente" ADD CONSTRAINT "FK_2727edd094237a1c1a1a6ebcd3a" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."consulta" ADD CONSTRAINT "FK_6b678cfda2b959923a91de5d9a0" FOREIGN KEY ("atendenteId") REFERENCES "atendente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."consulta" ADD CONSTRAINT "FK_4031e5f37ca2454252328df45a3" FOREIGN KEY ("alunoId") REFERENCES "aluno"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."consulta" ADD CONSTRAINT "FK_9ba0fd5a307d333a3330e45a0d2" FOREIGN KEY ("agendaId") REFERENCES "agenda"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."consulta" DROP CONSTRAINT "FK_9ba0fd5a307d333a3330e45a0d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."consulta" DROP CONSTRAINT "FK_4031e5f37ca2454252328df45a3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."consulta" DROP CONSTRAINT "FK_6b678cfda2b959923a91de5d9a0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."atendente" DROP CONSTRAINT "FK_2727edd094237a1c1a1a6ebcd3a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."supervisor" DROP CONSTRAINT "FK_dbf714549b6687c483773e14024"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."consulta" ALTER COLUMN "agendaId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."consulta" ALTER COLUMN "alunoId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."consulta" ALTER COLUMN "atendenteId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."consulta" ADD CONSTRAINT "FK_9ba0fd5a307d333a3330e45a0d2" FOREIGN KEY ("agendaId") REFERENCES "agenda"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."consulta" ADD CONSTRAINT "FK_4031e5f37ca2454252328df45a3" FOREIGN KEY ("alunoId") REFERENCES "aluno"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."consulta" ADD CONSTRAINT "FK_6b678cfda2b959923a91de5d9a0" FOREIGN KEY ("atendenteId") REFERENCES "atendente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."atendente" ALTER COLUMN "usuarioId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."atendente" ALTER COLUMN "aprovado" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."atendente" ADD CONSTRAINT "FK_2727edd094237a1c1a1a6ebcd3a" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."supervisor" ALTER COLUMN "usuarioId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."supervisor" ALTER COLUMN "aprovado" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."supervisor" ADD CONSTRAINT "FK_dbf714549b6687c483773e14024" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
