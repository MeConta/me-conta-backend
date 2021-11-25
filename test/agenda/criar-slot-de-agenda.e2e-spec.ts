import { TestingModule } from '@nestjs/testing';
import { getTestingModule, getToken } from '../utils.test';
import { AuthModule } from '../../src/modules/auth/auth.module';
import { setupApp } from '../../src/config/app.config';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as moment from 'moment';
import { TipoUsuario } from '../../src/_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import * as request from 'supertest';
import { AgendaModule } from '../../src/modules/agenda/agenda.module';
import { UsuarioModule } from '../../src/modules/usuario/usuario.module';
import { VoluntarioModule } from '../../src/modules/voluntario/voluntario.module';
import { Connection } from 'typeorm';
import { VoluntarioDbEntity } from '../../src/_adapters/voluntarios/entidades/voluntario-db.entity';

describe('Criar slot de Agenda (e2e)', () => {
  let app: INestApplication;
  let token: string;
  const req = {
    slots: [
      {
        inicio: moment().toDate().toISOString(),
      },
    ],
  };
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
  beforeEach(async () => {
    token = await getToken(app, TipoUsuario.ATENDENTE);
  });
  afterEach(async () => {
    await app.close();
  });

  describe('/agenda (POST)', () => {
    it('Deve Criar um slot com sucesso', async () => {
      await request(app.getHttpServer())
        .post('/agenda')
        .set('Authorization', `Bearer ${token}`)
        .send(req)
        .expect(HttpStatus.NO_CONTENT);
    });
    it('Não deve criar um slot para atendentes não aprovados', async () => {
      const voluntarioRepo = app
        .get(Connection)
        .getRepository(VoluntarioDbEntity);

      await voluntarioRepo.save({
        ...(await voluntarioRepo.findOne(1)),
        aprovado: null,
      });

      await request(app.getHttpServer())
        .post('/agenda')
        .set('Authorization', `Bearer ${token}`)
        .send(req)
        .expect(HttpStatus.UNPROCESSABLE_ENTITY);
    });
    it('Deve dar erro 400', async () => {
      await request(app.getHttpServer())
        .post('/agenda')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...req, slots: null })
        .expect(HttpStatus.BAD_REQUEST);
    });
    it('Deve dar erro 401', async () => {
      await request(app.getHttpServer())
        .post('/agenda')
        .send(req)
        .expect(HttpStatus.UNAUTHORIZED);
    });
    it('Deve dar erro 403', async () => {
      await request(app.getHttpServer())
        .post('/agenda')
        .set('Authorization', `Bearer ${await getToken(app)}`)
        .send(req)
        .expect(HttpStatus.FORBIDDEN);
    });
  });
});
