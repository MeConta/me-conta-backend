import { MigrationInterface, QueryRunner } from 'typeorm';

export class migracaoCasaLimpa1631905444697 implements MigrationInterface {
  name = 'migracaoCasaLimpa1631905444697';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "usuario" ("id" SERIAL NOT NULL, "dataCriacao" TIMESTAMP NOT NULL DEFAULT now(), "dataAlteracao" TIMESTAMP NOT NULL DEFAULT now(), "dataExclusao" TIMESTAMP, "nome" character varying NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, "dataNascimento" TIMESTAMP NOT NULL, "genero" character varying NOT NULL DEFAULT 'ND', "UF" character varying NOT NULL, "cidade" character varying NOT NULL, "telefone" character varying NOT NULL, "tipoUsuario" character varying NOT NULL DEFAULT 'ALUNO', "salt" character varying NOT NULL, CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email"), CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "usuario"`);
  }
}
