import { MigrationInterface, QueryRunner } from 'typeorm';
export class cadastroAdmin1635797119669 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO public.usuario ("dataCriacao", "dataAlteracao", "dataExclusao", id, nome, email, senha, salt, tipo,
                                  "dataTermos")
      VALUES (DEFAULT, DEFAULT, null, DEFAULT, 'admin', '${
        process.env.ADMIN_EMAIL
      }',
              '${process.env.ADMIN_PASSWORD_HASHED}', '${
      process.env.ADMIN_PASSWORD_SALT
    }',
              '3'::usuario_tipo_enum, '${new Date().toISOString()}');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM public.usuario usuario WHERE usuario.email = '${process.env.ADMIN_EMAIL}' 
    `);
  }
}
