import { TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TipoUsuario } from '../../src/_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { setupApp } from '../../src/config/app.config';
import { getTestingModule, getToken } from '../utils.test';
import { CreateAlunoDto } from '../../src/_adapters/alunos/dto/create-aluno.dto';
import {
  Estado,
  Genero,
} from '../../src/_business/usuarios/entidades/usuario.entity';
import {
  Escolaridade,
  TipoEscola,
} from '../../src/_business/alunos/entidades/aluno.entity';
import { UsuarioModule } from '../../src/modules/usuario/usuario.module';
import { AuthModule } from '../../src/modules/auth/auth.module';
import { AlunoModule } from '../../src/modules/aluno/aluno.module';
import { PerfilModule } from '../../src/modules/perfil/perfil.module';
import * as request from 'supertest';
import { AtualizarAlunoDto } from '../../src/_adapters/alunos/dto/atualizar-aluno.dto';
import { name } from '@faker-js/faker/locale/pt_BR';

describe('Criar Conta (e2e)', () => {
  let app: INestApplication;
  let token: string;

  const req = {
    telefone: '11912345678',
    cidade: 'Acrelândia',
    dataNascimento: new Date(1996, 7, 12),
    UF: Estado.AC,
    genero: Genero.PREFIRO_NAO_DECLARAR,
    tipoEscola: TipoEscola.PUBLICA,
    escolaridade: Escolaridade.PRIMEIRO_ANO,
  } as CreateAlunoDto;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await getTestingModule([
      AuthModule,
      UsuarioModule,
      PerfilModule,
      AlunoModule,
    ]);

    app = moduleFixture.createNestApplication();
    setupApp(app);
    await app.init();
  });

  beforeEach(async () => {
    token = await getToken(app, TipoUsuario.ALUNO);
    await request(app.getHttpServer())
      .post('/cadastro-aluno')
      .set('Authorization', `Bearer ${token}`)
      .send(req);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/aluno/atualizar/ (PATCH)', () => {
    it('Deve Atualizar um aluno com sucesso', async () => {
      await request(app.getHttpServer())
        .patch('/aluno/atualizar/1')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nome: name.firstName(),
        } as AtualizarAlunoDto)
        .expect(204);
    });

    it('Deve dar erro 400 ao passar um campo inválido', async () => {
      await request(app.getHttpServer())
        .patch('/aluno/atualizar/1')
        .set('Authorization', `Bearer ${token}`)
        .send({ UF: 'INVALID' })
        .expect(400);
    });

    it('Deve dar erro 401 ao tentar cadastrar sem logar', async () => {
      await request(app.getHttpServer())
        .patch('/aluno/atualizar/1')
        .send(req)
        .expect(401);
    });

    it('Deve dar erro 403 ao tentar atualizar perfil que não seja o seu', async () => {
      const wrongToken = await getToken(app, TipoUsuario.ALUNO);
      await request(app.getHttpServer())
        .patch('/aluno/atualizar/1')
        .set('Authorization', `Bearer ${wrongToken}`)
        .send(req)
        .expect(403);
    });

    it('Um Administrador deve ser capaz de atualizar um perfil de Aluno', async () => {
      const adminToken = await getToken(app, TipoUsuario.ADMINISTRADOR);
      const nome = name.firstName();
      await request(app.getHttpServer())
        .patch('/aluno/atualizar/1')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          nome,
        } as AtualizarAlunoDto)
        .expect(204);
    });
  });
});
