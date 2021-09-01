import {MigrationInterface, QueryRunner} from "typeorm";

export class migracaoInicial1630529112611 implements MigrationInterface {
    name = 'migracaoInicial1630529112611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "frente-atuacao" ("id" SERIAL NOT NULL, "dataCriacao" TIMESTAMP NOT NULL DEFAULT now(), "dataAlteracao" TIMESTAMP NOT NULL DEFAULT now(), "dataExclusao" TIMESTAMP, "nome" character varying NOT NULL, "descricao" character varying NOT NULL, CONSTRAINT "PK_71c1423cb508ce9beb38a96e9b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuario" ("id" SERIAL NOT NULL, "dataCriacao" TIMESTAMP NOT NULL DEFAULT now(), "dataAlteracao" TIMESTAMP NOT NULL DEFAULT now(), "dataExclusao" TIMESTAMP, "nome" character varying NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, "dataNascimento" TIMESTAMP NOT NULL, "genero" character varying NOT NULL DEFAULT 'ND', "UF" character varying NOT NULL, "cidade" character varying NOT NULL, "telefone" character varying NOT NULL, "tipoUsuario" character varying NOT NULL DEFAULT 'ALUNO', CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email"), CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "supervisor" ("id" SERIAL NOT NULL, "dataCriacao" TIMESTAMP NOT NULL DEFAULT now(), "dataAlteracao" TIMESTAMP NOT NULL DEFAULT now(), "dataExclusao" TIMESTAMP, "especializacao" character varying NOT NULL, "descricao" character varying NOT NULL, "instituicao" character varying NOT NULL, "aprovado" boolean, "areaAtuacao" character varying NOT NULL, "crp" character varying NOT NULL, "usuarioId" integer, CONSTRAINT "REL_dbf714549b6687c483773e1402" UNIQUE ("usuarioId"), CONSTRAINT "PK_6364b1ffaa6ca051de919c802ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "atendente" ("id" SERIAL NOT NULL, "dataCriacao" TIMESTAMP NOT NULL DEFAULT now(), "dataAlteracao" TIMESTAMP NOT NULL DEFAULT now(), "dataExclusao" TIMESTAMP, "especializacao" character varying NOT NULL, "descricao" character varying NOT NULL, "instituicao" character varying NOT NULL, "aprovado" boolean, "formado" boolean NOT NULL, "semestre" integer, "anoFormacao" integer, "usuarioId" integer, "supervisorId" integer, CONSTRAINT "REL_2727edd094237a1c1a1a6ebcd3" UNIQUE ("usuarioId"), CONSTRAINT "REL_d8c571bdd53b0db10e5405bc5d" UNIQUE ("supervisorId"), CONSTRAINT "PK_695420d3280fdd5b0270622775f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "aluno" ("id" SERIAL NOT NULL, "dataCriacao" TIMESTAMP NOT NULL DEFAULT now(), "dataAlteracao" TIMESTAMP NOT NULL DEFAULT now(), "dataExclusao" TIMESTAMP, "tipoEscola" character varying NOT NULL DEFAULT 'PUBLICA', "grauEnsinoMedio" integer NOT NULL, "usuarioId" integer NOT NULL, CONSTRAINT "REL_8fbcdd66cfdb4304b8764d97e8" UNIQUE ("usuarioId"), CONSTRAINT "PK_9611d4cf7a77574063439cf46b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "consulta" ("id" SERIAL NOT NULL, "dataCriacao" TIMESTAMP NOT NULL DEFAULT now(), "dataAlteracao" TIMESTAMP NOT NULL DEFAULT now(), "dataExclusao" TIMESTAMP, "alunoId" integer NOT NULL, "agendaId" integer NOT NULL, CONSTRAINT "PK_248230d7f1e2536f83b4d07c955" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "agenda" ("id" SERIAL NOT NULL, "dataCriacao" TIMESTAMP NOT NULL DEFAULT now(), "dataAlteracao" TIMESTAMP NOT NULL DEFAULT now(), "dataExclusao" TIMESTAMP, "data" TIMESTAMP NOT NULL, "atendenteId" integer, CONSTRAINT "PK_49397cfc20589bebaac8b43251d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "avaliacao" ("id" SERIAL NOT NULL, "dataCriacao" TIMESTAMP NOT NULL DEFAULT now(), "dataAlteracao" TIMESTAMP NOT NULL DEFAULT now(), "dataExclusao" TIMESTAMP, "nota" integer NOT NULL, "comentario" character varying NOT NULL, "mostrar" boolean NOT NULL DEFAULT true, "anonimo" boolean NOT NULL DEFAULT false, "aprovado" boolean, "data" TIMESTAMP NOT NULL DEFAULT NOW(), "consultaId" integer, CONSTRAINT "REL_535bd2104071fc1fc23a464cc2" UNIQUE ("consultaId"), CONSTRAINT "PK_fd3e156019eb4b68c6c9f746d51" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "supervisor_frentes_atuacao_frente-atuacao" ("supervisorId" integer NOT NULL, "frenteAtuacaoId" integer NOT NULL, CONSTRAINT "PK_8ea29b2870cbccef4ac77f1b678" PRIMARY KEY ("supervisorId", "frenteAtuacaoId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8e9d7232771ab12e0ac0430fea" ON "supervisor_frentes_atuacao_frente-atuacao" ("supervisorId") `);
        await queryRunner.query(`CREATE INDEX "IDX_84518ac7579128b68f2d53ba1a" ON "supervisor_frentes_atuacao_frente-atuacao" ("frenteAtuacaoId") `);
        await queryRunner.query(`CREATE TABLE "atendente_frentes_atuacao_frente-atuacao" ("atendenteId" integer NOT NULL, "frenteAtuacaoId" integer NOT NULL, CONSTRAINT "PK_32f5690ec2fd6646a44d80e6786" PRIMARY KEY ("atendenteId", "frenteAtuacaoId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_165d8f377099bdca6100f73871" ON "atendente_frentes_atuacao_frente-atuacao" ("atendenteId") `);
        await queryRunner.query(`CREATE INDEX "IDX_436fed4f0f548d381488cfe821" ON "atendente_frentes_atuacao_frente-atuacao" ("frenteAtuacaoId") `);
        await queryRunner.query(`ALTER TABLE "supervisor" ADD CONSTRAINT "FK_dbf714549b6687c483773e14024" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "atendente" ADD CONSTRAINT "FK_2727edd094237a1c1a1a6ebcd3a" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "atendente" ADD CONSTRAINT "FK_d8c571bdd53b0db10e5405bc5d7" FOREIGN KEY ("supervisorId") REFERENCES "supervisor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "aluno" ADD CONSTRAINT "FK_8fbcdd66cfdb4304b8764d97e83" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consulta" ADD CONSTRAINT "FK_4031e5f37ca2454252328df45a3" FOREIGN KEY ("alunoId") REFERENCES "aluno"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consulta" ADD CONSTRAINT "FK_9ba0fd5a307d333a3330e45a0d2" FOREIGN KEY ("agendaId") REFERENCES "agenda"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agenda" ADD CONSTRAINT "FK_5f1654821006a11534e34a02f72" FOREIGN KEY ("atendenteId") REFERENCES "atendente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "avaliacao" ADD CONSTRAINT "FK_535bd2104071fc1fc23a464cc21" FOREIGN KEY ("consultaId") REFERENCES "consulta"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "supervisor_frentes_atuacao_frente-atuacao" ADD CONSTRAINT "FK_8e9d7232771ab12e0ac0430feac" FOREIGN KEY ("supervisorId") REFERENCES "supervisor"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "supervisor_frentes_atuacao_frente-atuacao" ADD CONSTRAINT "FK_84518ac7579128b68f2d53ba1a7" FOREIGN KEY ("frenteAtuacaoId") REFERENCES "frente-atuacao"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "atendente_frentes_atuacao_frente-atuacao" ADD CONSTRAINT "FK_165d8f377099bdca6100f73871e" FOREIGN KEY ("atendenteId") REFERENCES "atendente"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "atendente_frentes_atuacao_frente-atuacao" ADD CONSTRAINT "FK_436fed4f0f548d381488cfe821f" FOREIGN KEY ("frenteAtuacaoId") REFERENCES "frente-atuacao"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "atendente_frentes_atuacao_frente-atuacao" DROP CONSTRAINT "FK_436fed4f0f548d381488cfe821f"`);
        await queryRunner.query(`ALTER TABLE "atendente_frentes_atuacao_frente-atuacao" DROP CONSTRAINT "FK_165d8f377099bdca6100f73871e"`);
        await queryRunner.query(`ALTER TABLE "supervisor_frentes_atuacao_frente-atuacao" DROP CONSTRAINT "FK_84518ac7579128b68f2d53ba1a7"`);
        await queryRunner.query(`ALTER TABLE "supervisor_frentes_atuacao_frente-atuacao" DROP CONSTRAINT "FK_8e9d7232771ab12e0ac0430feac"`);
        await queryRunner.query(`ALTER TABLE "avaliacao" DROP CONSTRAINT "FK_535bd2104071fc1fc23a464cc21"`);
        await queryRunner.query(`ALTER TABLE "agenda" DROP CONSTRAINT "FK_5f1654821006a11534e34a02f72"`);
        await queryRunner.query(`ALTER TABLE "consulta" DROP CONSTRAINT "FK_9ba0fd5a307d333a3330e45a0d2"`);
        await queryRunner.query(`ALTER TABLE "consulta" DROP CONSTRAINT "FK_4031e5f37ca2454252328df45a3"`);
        await queryRunner.query(`ALTER TABLE "aluno" DROP CONSTRAINT "FK_8fbcdd66cfdb4304b8764d97e83"`);
        await queryRunner.query(`ALTER TABLE "atendente" DROP CONSTRAINT "FK_d8c571bdd53b0db10e5405bc5d7"`);
        await queryRunner.query(`ALTER TABLE "atendente" DROP CONSTRAINT "FK_2727edd094237a1c1a1a6ebcd3a"`);
        await queryRunner.query(`ALTER TABLE "supervisor" DROP CONSTRAINT "FK_dbf714549b6687c483773e14024"`);
        await queryRunner.query(`DROP INDEX "IDX_436fed4f0f548d381488cfe821"`);
        await queryRunner.query(`DROP INDEX "IDX_165d8f377099bdca6100f73871"`);
        await queryRunner.query(`DROP TABLE "atendente_frentes_atuacao_frente-atuacao"`);
        await queryRunner.query(`DROP INDEX "IDX_84518ac7579128b68f2d53ba1a"`);
        await queryRunner.query(`DROP INDEX "IDX_8e9d7232771ab12e0ac0430fea"`);
        await queryRunner.query(`DROP TABLE "supervisor_frentes_atuacao_frente-atuacao"`);
        await queryRunner.query(`DROP TABLE "avaliacao"`);
        await queryRunner.query(`DROP TABLE "agenda"`);
        await queryRunner.query(`DROP TABLE "consulta"`);
        await queryRunner.query(`DROP TABLE "aluno"`);
        await queryRunner.query(`DROP TABLE "atendente"`);
        await queryRunner.query(`DROP TABLE "supervisor"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`DROP TABLE "frente-atuacao"`);
    }

}
