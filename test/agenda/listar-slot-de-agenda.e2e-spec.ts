import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { agendaTestingApp } from './agenda.utils';

describe('Listar slots de Agenda (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await agendaTestingApp();
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
