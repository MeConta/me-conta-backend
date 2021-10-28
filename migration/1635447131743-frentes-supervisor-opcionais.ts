import { MigrationInterface, QueryRunner } from 'typeorm';

export class frentesSupervisorOpcionais1635447131743
  implements MigrationInterface
{
  name = 'frentesSupervisorOpcionais1635447131743';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."aluno" DROP CONSTRAINT "FK_9611d4cf7a77574063439cf46b2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."aluno" ADD CONSTRAINT "UQ_9611d4cf7a77574063439cf46b2" UNIQUE ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."perfil" DROP CONSTRAINT "FK_814c50101bf1675e1f691aad2c9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."perfil" ADD CONSTRAINT "UQ_814c50101bf1675e1f691aad2c9" UNIQUE ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."recuperacao" DROP CONSTRAINT "FK_e3ce8d9952c91164bdd902683c1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."recuperacao" ADD CONSTRAINT "UQ_e3ce8d9952c91164bdd902683c1" UNIQUE ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."voluntario" DROP CONSTRAINT "FK_1d99ad45a72bd4c8d02689e8b88"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."voluntario" ALTER COLUMN "frentes" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."voluntario" ADD CONSTRAINT "UQ_1d99ad45a72bd4c8d02689e8b88" UNIQUE ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."aluno" ADD CONSTRAINT "FK_9611d4cf7a77574063439cf46b2" FOREIGN KEY ("id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."perfil" ADD CONSTRAINT "FK_814c50101bf1675e1f691aad2c9" FOREIGN KEY ("id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."recuperacao" ADD CONSTRAINT "FK_e3ce8d9952c91164bdd902683c1" FOREIGN KEY ("id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."voluntario" ADD CONSTRAINT "FK_1d99ad45a72bd4c8d02689e8b88" FOREIGN KEY ("id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."voluntario" DROP CONSTRAINT "FK_1d99ad45a72bd4c8d02689e8b88"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."recuperacao" DROP CONSTRAINT "FK_e3ce8d9952c91164bdd902683c1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."perfil" DROP CONSTRAINT "FK_814c50101bf1675e1f691aad2c9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."aluno" DROP CONSTRAINT "FK_9611d4cf7a77574063439cf46b2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."voluntario" DROP CONSTRAINT "UQ_1d99ad45a72bd4c8d02689e8b88"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."voluntario" ALTER COLUMN "frentes" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."voluntario" ADD CONSTRAINT "FK_1d99ad45a72bd4c8d02689e8b88" FOREIGN KEY ("id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."recuperacao" DROP CONSTRAINT "UQ_e3ce8d9952c91164bdd902683c1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."recuperacao" ADD CONSTRAINT "FK_e3ce8d9952c91164bdd902683c1" FOREIGN KEY ("id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."perfil" DROP CONSTRAINT "UQ_814c50101bf1675e1f691aad2c9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."perfil" ADD CONSTRAINT "FK_814c50101bf1675e1f691aad2c9" FOREIGN KEY ("id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."aluno" DROP CONSTRAINT "UQ_9611d4cf7a77574063439cf46b2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."aluno" ADD CONSTRAINT "FK_9611d4cf7a77574063439cf46b2" FOREIGN KEY ("id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
