import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CadastroInicialModule } from '../src/cadastro-inicial/cadastro-inicial.module';
import { CreateUsuarioDto } from '../src/_adapters/usuarios/dto/create-usuario.dto';
import { TipoUsuario } from '../src/_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioDbEntity } from '../src/_adapters/usuarios/entidades/usuario.db.entity';
import { setupApp } from '../src/config/app.config';

describe('Criar Conta (e2e)', () => {
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
      ],
    }).compile();

    app = await moduleFixture.createNestApplication();
    setupApp(app);
    await app.init();
  });

  describe('/cadastro-inicial (POST)', () => {
    const req = {
      nome: 'Teste',
      email: 'teste@teste.com',
      senha: 'SenH4F@rt33',
      tipo: TipoUsuario.ATENDENTE,
    } as CreateUsuarioDto;

    it('Deve Cadastrar um usuário com sucesso', async () => {
      await request(app.getHttpServer())
        .post('/cadastro-inicial')
        .send(req)
        .expect(204);
    });

    it('Deve dar erro 400 ao passar um campo inválido', async () => {
      await request(app.getHttpServer())
        .post('/cadastro-inicial')
        .send({ ...req, nome: null } as CreateUsuarioDto)
        .expect(400);
    });

    it('Deve dar erro 409 ao tentar cadastrar o mesmo e-mail', async () => {
      await request(app.getHttpServer())
        .post('/cadastro-inicial')
        .send(req)
        .expect(204);

      await request(app.getHttpServer())
        .post('/cadastro-inicial')
        .send(req)
        .expect(409);
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
