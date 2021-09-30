import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsuarioStub } from '../src/testing/usuario.stub';
import { DbE2eModule } from './db.e2e.module';
import { CadastroInicialModule } from '../src/cadastro-inicial/cadastro-inicial.module';
import { CreateUsuarioDto } from '../src/_adapters/usuarios/dto/create-usuario.dto';
import { TipoUsuario } from '../src/_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';

describe('Criar Conta (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DbE2eModule, CadastroInicialModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    console.log(app);
    await app.init();
  });

  it('/usuario (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/cadastro-inicial')
      .send({
        nome: 'Teste',
        email: 'teste@teste.com',
        senha: 'SenH4F@rt33',
        tipo: TipoUsuario.ATENDENTE,
      } as CreateUsuarioDto)
      .expect(201);

    expect(response.body.nome).toBe(UsuarioStub.getEntity().nome);
  });

  afterEach(async () => {
    await app.close();
  });
});
