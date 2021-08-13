import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsuarioModule } from '../src/usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../src/usuario/entities/usuario.entity';
import { Connection } from 'typeorm';
import { UsuarioStub } from '../src/testing/usuario.stub';
import { createDeflateRaw } from 'zlib';
import { CreateUsuarioDto } from '../src/usuario/dto/create-usuario.dto';
import { DbE2eModule } from './db.e2e.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DbE2eModule, UsuarioModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    const connection = app.get(Connection);
    const repository = connection.getRepository(Usuario);
    await repository.save(UsuarioStub.getEntity());
  });

  it('/usuario (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/usuario')
      .expect(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('/usuario (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/usuario')
      .send({
        ...UsuarioStub.getCreateDto(),
        email: 'nao-duplicado@teste.com',
      })
      .expect(201);

    expect(response.body.nome).toBe(UsuarioStub.getEntity().nome);
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

  afterEach(async () => {
    await app.get(Connection).synchronize(true);
  });

  it('/usuario (DELETE)', async () => {
    await request(app.getHttpServer()).delete(`/usuario/1`).expect(204);
  });

  afterEach(async () => {
    await app.get(Connection).synchronize(true);
  });

  afterAll(async () => {
    await app.close();
  });
});
