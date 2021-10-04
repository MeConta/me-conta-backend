import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioDbEntity } from '../src/_adapters/usuarios/entidades/usuario.db.entity';
import { CadastroInicialModule } from '../src/cadastro-inicial/cadastro-inicial.module';
import { setupApp } from '../src/config/app.config';
import { createUser } from './utils.test';
import * as request from 'supertest';
import { AuthModule } from '../src/auth/auth.module';
import { CreateUsuarioDto } from '../src/_adapters/usuarios/dto/create-usuario.dto';
import { AuthDto, TokenDto } from '../src/_adapters/auth/dto/auth.dto';

describe('Autenticação (e2)', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: ':memory:',
          dropSchema: true,
          logging: false,
          autoLoadEntities: true,
          entities: [UsuarioDbEntity],
          synchronize: true,
        }),
        CadastroInicialModule,
        AuthModule.forRoot(),
      ],
    }).compile();
    app = await moduleFixture.createNestApplication();
    setupApp(app);
    await app.init();
  });
  afterEach(async () => {
    await app.close();
  });
  describe('/auth/login (POST)', () => {
    let user: CreateUsuarioDto;
    beforeEach(async () => {
      user = await createUser(app);
    });
    it('Deve logar com um usuário', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          username: user.email,
          password: user.senha,
        } as AuthDto)
        .expect(200);
      expect((body as TokenDto).token).toBeDefined();
      expect((body as TokenDto).token).toEqual(expect.any(String));
    });
    it('Não Deve logar com senha incorreta', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ ...user, password: 'senha-incorreta' })
        .expect(401);
    });
  });
});
