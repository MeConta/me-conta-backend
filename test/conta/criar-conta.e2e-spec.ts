import { TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsuarioModule } from '../../src/modules/usuario/usuario.module';
import { CreateUsuarioDto } from '../../src/_adapters/usuarios/dto/create-usuario.dto';
import { TipoUsuario } from '../../src/_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { setupApp } from '../../src/config/app.config';
import { createUser, getTestingModule } from '../utils.test';
import { internet, name } from 'faker/locale/pt_BR';
import { DEFAULT_PASSWORD } from '../../jest.setup';

describe('Criar Conta (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await getTestingModule([
      UsuarioModule,
    ]);

    app = moduleFixture.createNestApplication();
    setupApp(app);
    await app.init();
  });

  describe('/cadastro-inicial (POST)', () => {
    const req = {
      nome: name.firstName(),
      email: internet.email(),
      senha: DEFAULT_PASSWORD,
      tipo: TipoUsuario.ALUNO,
    } as CreateUsuarioDto;

    it('Deve Cadastrar um usuário com sucesso', async () => {
      await request(app.getHttpServer())
        .post('/cadastro-inicial')
        .send(req)
        .expect(201);
    });

    it('Deve dar erro 400 ao passar um campo inválido', async () => {
      await request(app.getHttpServer())
        .post('/cadastro-inicial')
        .send({ ...req, email: null } as CreateUsuarioDto)
        .expect(400);
    });

    it('Deve dar erro 409 ao tentar cadastrar o mesmo e-mail', async () => {
      const usuario = await createUser(app);

      await request(app.getHttpServer())
        .post('/cadastro-inicial')
        .send({ ...req, email: usuario.email } as CreateUsuarioDto)
        .expect(409);
    });

    it('Deve dar erro 403 ao tentar cadastrar um administrador', async () => {
      await createUser(app);
      await request(app.getHttpServer())
        .post('/cadastro-inicial')
        .send({ ...req, tipo: TipoUsuario.ADMINISTRADOR } as CreateUsuarioDto)
        .expect(403);
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
