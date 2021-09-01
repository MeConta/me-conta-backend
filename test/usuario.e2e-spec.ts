import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsuarioModule } from '../src/usuario/usuario.module';
import { UsuarioStub } from '../src/testing/usuario.stub';
import { DbE2eModule } from './db.e2e.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const BIRTH_DATE = new Date('1960-05-20').toISOString();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DbE2eModule, UsuarioModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/usuario (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/usuario')
      .send({
        ...UsuarioStub.getCreateDto(),
        dataNascimento: BIRTH_DATE,
      })
      .expect(201);

    expect(response.body.nome).toBe(UsuarioStub.getEntity().nome);
  });

  it('/usuario (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/usuario')
      .expect(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.items).toBeInstanceOf(Array);
    expect(response.body.items[0]).toBeDefined();
    expect(response.body.items[0].dataNascimento).toBe(BIRTH_DATE);
  });

  it('/usuario (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/usuario/1`)
      .send({
        nome: 'teste',
      } as any)
      .expect(200);
    expect(response.body.nome).toBe('teste');
  });

  it('/usuario (DELETE)', async () => {
    await request(app.getHttpServer()).delete(`/usuario/1`).expect(204);
  });

  afterAll(async () => {
    await app.close();
  });
});
