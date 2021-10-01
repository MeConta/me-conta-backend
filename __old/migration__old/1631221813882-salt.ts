import {MigrationInterface, QueryRunner} from "typeorm";

export class salt1631221813882 implements MigrationInterface {
    name = 'salt1631221813882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."usuario" ADD "salt" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."usuario" DROP COLUMN "salt"`);
    }

}
