import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { UsuarioModule } from '../../src/modules/usuario/usuario.module';
import { setupApp } from '../../src/config/app.config';
import { createUser, getTestingModule } from '../utils.test';
import * as request from 'supertest';
import { AuthModule } from '../../src/modules/auth/auth.module';
import { TokenDto } from '../../src/_adapters/auth/dto/auth.dto';
import { Usuario } from '../../src/_business/usuarios/entidades/usuario.entity';
import { DEFAULT_PASSWORD } from '../../jest.setup';

describe('Autenticação (e2)', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await getTestingModule([
      AuthModule.forRoot(),
      UsuarioModule,
    ]);

    app = moduleFixture.createNestApplication();
    setupApp(app);
    await app.init();
  });
  afterEach(async () => {
    await app.close();
  });
  describe('/auth/login (POST)', () => {
    let user: Usuario;
    beforeEach(async () => {
      user = await createUser(app);
    });
    it('Deve logar com um usuário', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          username: user.email,
          password: DEFAULT_PASSWORD,
        })
        .expect(200);
      expect((body as TokenDto).token).toBeDefined();
      expect((body as TokenDto).token).toEqual(expect.any(String));
    });
    it('Não Deve logar com senha incorreta', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          username: user.email,
          password: 'senha-incorreta',
        })
        .expect(401);
    });
  });
});
