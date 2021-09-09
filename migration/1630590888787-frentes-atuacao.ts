import { MigrationInterface, QueryRunner } from 'typeorm';

export class frentesAtuacao1630590888787 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO public."frente-atuacao" (id, "dataCriacao", "dataAlteracao", "dataExclusao", nome, descricao)
        VALUES (DEFAULT, DEFAULT, DEFAULT, null, 'Sessões de acolhimento dos estudantes',
            'Sessões de acolhimento dos estudantes')`);

    await queryRunner.query(`INSERT INTO public."frente-atuacao" (id, "dataCriacao", "dataAlteracao", "dataExclusao", nome, descricao)
        VALUES (DEFAULT, DEFAULT, DEFAULT, null, 'Coaching de rotina de estudos', 'Coaching de rotina de estudos')`);

    await queryRunner.query(`INSERT INTO public."frente-atuacao" (id, "dataCriacao", "dataAlteracao", "dataExclusao", nome, descricao)
        VALUES (DEFAULT, DEFAULT, DEFAULT, null, 'Orientação vocacional', 'Orientação vocacional')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM public."frente-atuacao" WHERE nome = 'Sessões de acolhimento dos estudantes'`,
    );

    await queryRunner.query(
      `DELETE FROM public."frente-atuacao" WHERE nome = 'Coaching de rotina de estudos'`,
    );

    await queryRunner.query(
      `DELETE FROM public."frente-atuacao" WHERE nome = 'Orientação vocacional'`,
    );
  }
}
