import { MigrationInterface, QueryRunner } from 'typeorm';

export class tipoUsuario1628712744686 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "tipo-usuario" ("nome") VALUES ('Atendente')`,
    );
    await queryRunner.query(
      `INSERT INTO "tipo-usuario" ("nome") VALUES ('Supervisor')`,
    );
    await queryRunner.query(
      `INSERT INTO "tipo-usuario" ("nome") VALUES ('Aluno')`,
    );
    await queryRunner.query(
      `INSERT INTO "tipo-usuario" ("nome") VALUES ('Administrador')`,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "tipo-usuario" WHERE "nome" ='Atendente'`,
    );
    await queryRunner.query(
      `DELETE FROM "tipo-usuario" WHERE "nome" ='Supervisor'`,
    );
    await queryRunner.query(`DELETE FROM "tipo-usuario" WHERE "nome" ='Aluno'`);
    await queryRunner.query(
      `DELETE FROM "tipo-usuario" WHERE "nome" ='Administrador'`,
    );
  }
}
