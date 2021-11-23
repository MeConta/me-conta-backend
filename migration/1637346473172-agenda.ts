import { MigrationInterface, QueryRunner } from 'typeorm';

export class agenda1637346473172 implements MigrationInterface {
  name = 'agenda1637346473172';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "slot-agenda" ("dataCriacao" TIMESTAMP NOT NULL DEFAULT now(), "dataAlteracao" TIMESTAMP NOT NULL DEFAULT now(), "dataExclusao" TIMESTAMP, "id" SERIAL NOT NULL, "inicio" TIMESTAMP NOT NULL, "fim" TIMESTAMP NOT NULL, "voluntarioId" integer, CONSTRAINT "PK_a106f04061f4b2d3426926ad532" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "slot-agenda" ADD CONSTRAINT "FK_e349eae39f81c3280260570055b" FOREIGN KEY ("voluntarioId") REFERENCES "voluntario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "slot-agenda" DROP CONSTRAINT "FK_e349eae39f81c3280260570055b"`,
    );
    await queryRunner.query(`DROP TABLE "slot-agenda"`);
  }
}
