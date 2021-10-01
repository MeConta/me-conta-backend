import {MigrationInterface, QueryRunner} from "typeorm";

export class usuarioAdminInicial1631732276908 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO public."usuario" ("dataCriacao", "dataAlteracao", "dataExclusao", nome, email, senha, 
                        "dataNascimento", genero, "UF", cidade, telefone, "tipoUsuario", salt)
        VALUES('2021-09-15 19:05:18.878703', '2021-09-15 19:05:18.878703', null, 'Administrador Me Conta', 'admin@meconta.org', 
            '$2b$10$//47txJlORV7xGOZ9tgWBuSCyCclXP03YVMoVnZImIYqav66sI0aq', '2020-09-24 12:09:38.000000', 'M', 'SP', 'São Paulo', '(91) 99999-9999', 
            'ADMINISTRADOR', '$2b$10$//47txJlORV7xGOZ9tgWBu');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM public."usuario" where nome = 'Administrador Me Conta' `);
    }

}
