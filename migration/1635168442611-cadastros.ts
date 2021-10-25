import { MigrationInterface, QueryRunner } from 'typeorm';

export class cadastros1635168442611 implements MigrationInterface {
  name = 'cadastros1635168442611';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "usuario_tipo_enum" AS ENUM('0', '1', '2', '3')`,
    );
    await queryRunner.query(
      `CREATE TABLE "usuario" ("dataCriacao" TIMESTAMP NOT NULL DEFAULT now(), "dataAlteracao" TIMESTAMP NOT NULL DEFAULT now(), "dataExclusao" TIMESTAMP, "id" SERIAL NOT NULL, "nome" character varying NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, "salt" character varying NOT NULL, "tipo" "usuario_tipo_enum" NOT NULL DEFAULT '0', "dataTermos" TIMESTAMP NOT NULL, CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email"), CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "aluno_escolaridade_enum" AS ENUM('0', '1', '2', '3', '4', '5')`,
    );
    await queryRunner.query(
      `CREATE TYPE "aluno_tipoescola_enum" AS ENUM('0', '1')`,
    );
    await queryRunner.query(
      `CREATE TABLE "aluno" ("dataCriacao" TIMESTAMP NOT NULL DEFAULT now(), "dataAlteracao" TIMESTAMP NOT NULL DEFAULT now(), "dataExclusao" TIMESTAMP, "escolaridade" "aluno_escolaridade_enum" NOT NULL, "tipoEscola" "aluno_tipoescola_enum" NOT NULL, "necessidades" character varying, "expectativas" character varying, "tratamentos" character varying, "id" integer NOT NULL, CONSTRAINT "REL_9611d4cf7a77574063439cf46b" UNIQUE ("id"), CONSTRAINT "PK_9611d4cf7a77574063439cf46b2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "perfil_uf_enum" AS ENUM('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO', 'DF')`,
    );
    await queryRunner.query(
      `CREATE TYPE "perfil_genero_enum" AS ENUM('M', 'F', 'NB', 'ND')`,
    );
    await queryRunner.query(
      `CREATE TABLE "perfil" ("cidade" character varying, "dataNascimento" TIMESTAMP, "UF" "perfil_uf_enum", "genero" "perfil_genero_enum", "telefone" character varying, "id" integer NOT NULL, CONSTRAINT "REL_814c50101bf1675e1f691aad2c" UNIQUE ("id"), CONSTRAINT "PK_814c50101bf1675e1f691aad2c9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "recuperacao" ("dataCriacao" TIMESTAMP NOT NULL DEFAULT now(), "dataAlteracao" TIMESTAMP NOT NULL DEFAULT now(), "dataExclusao" TIMESTAMP, "id" integer NOT NULL, "hash" character varying NOT NULL, "dataExpiracao" TIMESTAMP NOT NULL, CONSTRAINT "REL_e3ce8d9952c91164bdd902683c" UNIQUE ("id"), CONSTRAINT "PK_e3ce8d9952c91164bdd902683c1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "voluntario_frentes_enum" AS ENUM('0', '1', '2')`,
    );
    await queryRunner.query(
      `CREATE TYPE "voluntario_areaatuacao_enum" AS ENUM('professor', 'psicologo')`,
    );
    await queryRunner.query(
      `CREATE TABLE "voluntario" ("dataCriacao" TIMESTAMP NOT NULL DEFAULT now(), "dataAlteracao" TIMESTAMP NOT NULL DEFAULT now(), "dataExclusao" TIMESTAMP, "anoFormacao" integer, "aprovado" boolean, "crp" character varying, "formado" boolean NOT NULL, "frentes" "voluntario_frentes_enum" array NOT NULL, "instituicao" character varying NOT NULL, "semestre" integer, "areaAtuacao" "voluntario_areaatuacao_enum", "especializacoes" character varying, "bio" character varying, "id" integer NOT NULL, CONSTRAINT "REL_1d99ad45a72bd4c8d02689e8b8" UNIQUE ("id"), CONSTRAINT "PK_1d99ad45a72bd4c8d02689e8b88" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "aluno" ADD CONSTRAINT "FK_9611d4cf7a77574063439cf46b2" FOREIGN KEY ("id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "perfil" ADD CONSTRAINT "FK_814c50101bf1675e1f691aad2c9" FOREIGN KEY ("id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recuperacao" ADD CONSTRAINT "FK_e3ce8d9952c91164bdd902683c1" FOREIGN KEY ("id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "voluntario" ADD CONSTRAINT "FK_1d99ad45a72bd4c8d02689e8b88" FOREIGN KEY ("id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "voluntario" DROP CONSTRAINT "FK_1d99ad45a72bd4c8d02689e8b88"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recuperacao" DROP CONSTRAINT "FK_e3ce8d9952c91164bdd902683c1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "perfil" DROP CONSTRAINT "FK_814c50101bf1675e1f691aad2c9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "aluno" DROP CONSTRAINT "FK_9611d4cf7a77574063439cf46b2"`,
    );
    await queryRunner.query(`DROP TABLE "voluntario"`);
    await queryRunner.query(`DROP TYPE "voluntario_areaatuacao_enum"`);
    await queryRunner.query(`DROP TYPE "voluntario_frentes_enum"`);
    await queryRunner.query(`DROP TABLE "recuperacao"`);
    await queryRunner.query(`DROP TABLE "perfil"`);
    await queryRunner.query(`DROP TYPE "perfil_genero_enum"`);
    await queryRunner.query(`DROP TYPE "perfil_uf_enum"`);
    await queryRunner.query(`DROP TABLE "aluno"`);
    await queryRunner.query(`DROP TYPE "aluno_tipoescola_enum"`);
    await queryRunner.query(`DROP TYPE "aluno_escolaridade_enum"`);
    await queryRunner.query(`DROP TABLE "usuario"`);
    await queryRunner.query(`DROP TYPE "usuario_tipo_enum"`);
  }
}
