import { MigrationInterface, QueryRunner } from 'typeorm';

export class aluno1628717486177 implements MigrationInterface {
  name = 'aluno1628717486177';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tipo-usuario" ("dataCriacao" TIMESTAMP NOT NULL DEFAULT now(), "dataAlteracao" TIMESTAMP NOT NULL DEFAULT now(), "dataExclusao" TIMESTAMP, "id" SERIAL NOT NULL, "nome" character varying NOT NULL, "descricao" character varying, CONSTRAINT "PK_73169ce6e96dddf6172cdaa1e27" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "usuario" ("dataCriacao" TIMESTAMP NOT NULL DEFAULT now(), "dataAlteracao" TIMESTAMP NOT NULL DEFAULT now(), "dataExclusao" TIMESTAMP, "id" SERIAL NOT NULL, "nome" character varying NOT NULL, "senha" character varying NOT NULL, "dataNascimento" TIMESTAMP NOT NULL, "UF" character varying(2) NOT NULL, "genero" character varying NOT NULL, "cidade" character varying NOT NULL, "telefone" character varying NOT NULL, "email" character varying NOT NULL, "tipoUsuarioId" integer, CONSTRAINT "REL_839a74b9952fd140d2c957e9e4" UNIQUE ("tipoUsuarioId"), CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "aluno" ("dataCriacao" TIMESTAMP NOT NULL DEFAULT now(), "dataAlteracao" TIMESTAMP NOT NULL DEFAULT now(), "dataExclusao" TIMESTAMP, "id" SERIAL NOT NULL, "tipoEscola" text NOT NULL, "grauEnsinoMedio" integer NOT NULL, "usuarioId" integer, CONSTRAINT "REL_8fbcdd66cfdb4304b8764d97e8" UNIQUE ("usuarioId"), CONSTRAINT "PK_9611d4cf7a77574063439cf46b2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuario" ADD CONSTRAINT "FK_839a74b9952fd140d2c957e9e44" FOREIGN KEY ("tipoUsuarioId") REFERENCES "tipo-usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "aluno" ADD CONSTRAINT "FK_8fbcdd66cfdb4304b8764d97e83" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "aluno" DROP CONSTRAINT "FK_8fbcdd66cfdb4304b8764d97e83"`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuario" DROP CONSTRAINT "FK_839a74b9952fd140d2c957e9e44"`,
    );
    await queryRunner.query(`DROP TABLE "aluno"`);
    await queryRunner.query(`DROP TABLE "usuario"`);
    await queryRunner.query(`DROP TABLE "tipo-usuario"`);
  }
}
