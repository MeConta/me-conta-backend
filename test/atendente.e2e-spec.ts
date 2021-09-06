import { Test, TestingModule } from '@nestjs/testing';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { DbE2eModule } from './db.e2e.module';
import { AtendenteModule } from '../src/atendente/atendente.module';
import { AtendenteStub } from '../src/testing/atendente.stub';
import * as moment from 'moment';
import { Reflector } from '@nestjs/core';

describe('Atendente (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DbE2eModule, AtendenteModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );

    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );

    await app.init();
  });

  // beforeAll(async () => {});

  it('/atendente (POST)', async () => {
    const boneco = {
      ...AtendenteStub.getCreateDto(),
      frentesAtuacao: [1, 2, 3],
      dataNascimento: moment('1990-09-25').toISOString(),
    };

    const response = await request(app.getHttpServer())
      .post('/atendente')
      .send(boneco);

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
