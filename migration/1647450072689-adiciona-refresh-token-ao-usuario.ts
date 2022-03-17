import { MigrationInterface, QueryRunner } from 'typeorm';

export class adicionaRefreshTokenAoUsuario1647450072689
  implements MigrationInterface
{
  name = 'adicionaRefreshTokenAoUsuario1647450072689';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "usuario" ADD "refreshTokenHashed" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "usuario" DROP COLUMN "refreshTokenHashed"`,
    );
  }
}
