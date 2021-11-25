import { HttpStatus, INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { getTestingModule } from '../utils.test';
import { AuthModule } from '../../src/modules/auth/auth.module';
import { UsuarioModule } from '../../src/modules/usuario/usuario.module';
import { VoluntarioModule } from '../../src/modules/voluntario/voluntario.module';
import { AgendaModule } from '../../src/modules/agenda/agenda.module';
import { setupApp } from '../../src/config/app.config';
import * as request from 'supertest';

describe('Listar slots de Agenda (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await getTestingModule([
      AuthModule.forRoot(),
      UsuarioModule,
      VoluntarioModule,
      AgendaModule,
    ]);
    app = await moduleFixture.createNestApplication();
    setupApp(app);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/agenda (GET)', () => {
    it('Deve listar slots com sucesso', async () => {
      await request(app.getHttpServer()).get('/agenda').expect(HttpStatus.OK);
    });

    it('Deve dar erro de voluntário não encontrado', async () => {
      await request(app.getHttpServer())
        .get('/agenda/999')
        .expect(HttpStatus.NOT_FOUND);
    });

    it('Deve dar erro de parâmetro inválido', async () => {
      await request(app.getHttpServer())
        .get('/agenda/xpto')
        .expect(HttpStatus.BAD_REQUEST);
    });
  });
});
