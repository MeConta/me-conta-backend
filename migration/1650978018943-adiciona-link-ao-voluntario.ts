import { MigrationInterface, QueryRunner } from 'typeorm';

export class adicionaLinkAoVoluntario1650978018943
  implements MigrationInterface
{
  name = 'adicionaLinkAoVoluntario1650978018943';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "voluntario" ADD "link" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "slot-agenda" DROP CONSTRAINT "FK_e349eae39f81c3280260570055b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "slot-agenda" ALTER COLUMN "voluntarioId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "slot-agenda" ADD CONSTRAINT "FK_e349eae39f81c3280260570055b" FOREIGN KEY ("voluntarioId") REFERENCES "voluntario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "slot-agenda" DROP CONSTRAINT "FK_e349eae39f81c3280260570055b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "slot-agenda" ALTER COLUMN "voluntarioId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "slot-agenda" ADD CONSTRAINT "FK_e349eae39f81c3280260570055b" FOREIGN KEY ("voluntarioId") REFERENCES "voluntario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "voluntario" DROP COLUMN "link"`);
  }
}
