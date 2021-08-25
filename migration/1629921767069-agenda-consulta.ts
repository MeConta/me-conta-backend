import {MigrationInterface, QueryRunner} from "typeorm";

export class agendaConsulta1629921767069 implements MigrationInterface {
    name = 'agendaConsulta1629921767069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."consulta" DROP CONSTRAINT "FK_9ba0fd5a307d333a3330e45a0d2"`);
        await queryRunner.query(`ALTER TABLE "public"."consulta" DROP CONSTRAINT "REL_9ba0fd5a307d333a3330e45a0d"`);
        await queryRunner.query(`ALTER TABLE "public"."consulta" DROP COLUMN "agendaId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."consulta" ADD "agendaId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."consulta" ADD CONSTRAINT "REL_9ba0fd5a307d333a3330e45a0d" UNIQUE ("agendaId")`);
        await queryRunner.query(`ALTER TABLE "public"."consulta" ADD CONSTRAINT "FK_9ba0fd5a307d333a3330e45a0d2" FOREIGN KEY ("agendaId") REFERENCES "agenda"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
