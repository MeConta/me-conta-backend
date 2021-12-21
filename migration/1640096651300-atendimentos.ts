import { MigrationInterface, QueryRunner } from 'typeorm';

export class atendimentos1640096651300 implements MigrationInterface {
  name = 'atendimentos1640096651300';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "atendimentos" ("dataCriacao" TIMESTAMP NOT NULL DEFAULT now(), "dataAlteracao" TIMESTAMP NOT NULL DEFAULT now(), "dataExclusao" TIMESTAMP, "id" SERIAL NOT NULL, "data" TIMESTAMP NOT NULL, "status" integer NOT NULL, "voluntarioId" integer, "alunoId" integer, CONSTRAINT "PK_80a70d057e68924b970871d9089" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "atendimentos" ADD CONSTRAINT "FK_3f95aa1a5a0b5e015731dc4f0a9" FOREIGN KEY ("voluntarioId") REFERENCES "voluntario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "atendimentos" ADD CONSTRAINT "FK_185da5e2ab0cf3238fa2b4e1e7d" FOREIGN KEY ("alunoId") REFERENCES "aluno"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "atendimentos" DROP CONSTRAINT "FK_185da5e2ab0cf3238fa2b4e1e7d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "atendimentos" DROP CONSTRAINT "FK_3f95aa1a5a0b5e015731dc4f0a9"`,
    );
    await queryRunner.query(`DROP TABLE "atendimentos"`);
  }
}
