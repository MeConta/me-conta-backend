import { MigrationInterface, QueryRunner } from 'typeorm';

export class usuario1628712730606 implements MigrationInterface {
  name = 'usuario1628712730606';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tipo-usuario" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "descricao" character varying, CONSTRAINT "PK_73169ce6e96dddf6172cdaa1e27" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "usuario" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "senha" character varying NOT NULL, "dataNascimento" TIMESTAMP NOT NULL, "UF" character varying(2) NOT NULL, "genero" character varying NOT NULL, "cidade" character varying NOT NULL, "telefone" character varying NOT NULL, "email" character varying NOT NULL, "tipoUsuarioId" integer, CONSTRAINT "REL_839a74b9952fd140d2c957e9e4" UNIQUE ("tipoUsuarioId"), CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuario" ADD CONSTRAINT "FK_839a74b9952fd140d2c957e9e44" FOREIGN KEY ("tipoUsuarioId") REFERENCES "tipo-usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "usuario" DROP CONSTRAINT "FK_839a74b9952fd140d2c957e9e44"`,
    );
    await queryRunner.query(`DROP TABLE "usuario"`);
    await queryRunner.query(`DROP TABLE "tipo-usuario"`);
  }
}
