import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DbE2eModule } from './db.e2e.module';
import { AtendenteModule } from '../src/atendente/atendente.module';
import { AtendenteStub } from '../src/testing/atendente.stub';
import * as moment from 'moment';
import { setupApp } from '../src/config/app.config';
import { FrenteAtuacaoService } from '../src/frente-atuacao/frente-atuacao.service';
import { VoluntarioModule } from '../src/voluntario/voluntario.module';
import { FrenteAtuacaoStub } from '../src/testing/frente-atuacao.stub';

describe('Atendente (e2e)', () => {
  let app: INestApplication;
  let frenteAtuacaoService: FrenteAtuacaoService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DbE2eModule, AtendenteModule, VoluntarioModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app = setupApp(app);

    frenteAtuacaoService = app.get(FrenteAtuacaoService);

    await app.init();
  });

  beforeAll(async () => {
    await frenteAtuacaoService.create(FrenteAtuacaoStub.getCreateDto());
    await frenteAtuacaoService.create(FrenteAtuacaoStub.getCreateDto());
    await frenteAtuacaoService.create(FrenteAtuacaoStub.getCreateDto());
  });

  it('/atendente (POST)', async () => {
    const stub = {
      ...AtendenteStub.getCreateDto(),
      frentesAtuacao: [1, 2, 3],
      dataNascimento: moment('1990-09-25').toISOString(),
    };

    const response = await request(app.getHttpServer())
      .post('/atendente')
      .send(stub);

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
  });

  it('/atendente (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/atendente')
      .expect(200);
    expect(response.body).toBeDefined();
    expect(response.body.items).toBeInstanceOf(Array);
    expect(response.body.items[0]).toBeDefined();
  });

  it('/atendente (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/atendente/1`)
      .send({
        nome: 'teste',
      } as any)
      .expect(200);
    expect(response.body.nome).toBe('teste');
  });

  it('/atendente (DELETE)', async () => {
    await request(app.getHttpServer()).delete(`/atendente/1`).expect(204);
  });

  afterAll(async () => {
    await app.close();
  });
});
