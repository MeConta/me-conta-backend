import { MigrationInterface, QueryRunner } from 'typeorm';
import { BcryptHashService } from '../src/_adapters/usuarios/services/bcrypt-hash.service';
export class cadastroAdmin1635797119669 implements MigrationInterface {
  constructor(private readonly crypto = new BcryptHashService()) {}
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
      const { generateSalt, hash } = this.crypto;
      const SALT = await generateSalt();
      const HASH = await hash(process.env.ADMIN_PASSWORD, SALT);
      await queryRunner.query(`
      INSERT INTO public.usuario (
        "dataCriacao",
        "dataAlteracao",
        "dataExclusao",
        "id",
        "nome",
        "email",
        "senha",
        "salt",
        "tipo",
        "dataTermos"
      ) VALUES (
        DEFAULT,
        DEFAULT,
        null,
        DEFAULT,
        'admin',
        '${process.env.ADMIN_EMAIL}',
        '${HASH}',
        '${SALT}',
        '3'::usuario_tipo_enum,
        '${new Date().toISOString()}'
      );
    `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM public.usuario usuario WHERE usuario.email = '${process.env.ADMIN_EMAIL}'
    `);
  }
}
