import { TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsuarioModule } from '../src/modules/usuario/usuario.module';
import { TipoUsuario } from '../src/_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { UsuarioDbEntity } from '../src/_adapters/usuarios/entidades/usuario.db.entity';
import { setupApp } from '../src/config/app.config';
import { getTestingModule, getToken } from './utils.test';
import { AlunoDbEntity } from '../src/_adapters/alunos/entidades/aluno.db.entity';
import { PerfilDbEntity } from '../src/_adapters/perfil/entidades/perfil.db.entity';

import { AuthModule } from '../src/modules/auth/auth.module';
import { CreateVoluntarioDto } from '../src/_adapters/voluntarios/dto/create-voluntario.dto';
import * as moment from 'moment';
import {
  Estado,
  Genero,
} from '../src/_business/usuarios/entidades/usuario.entity';
import {
  AreaAtuacao,
  FrenteAtuacao,
} from '../src/_business/voluntarios/entidades/voluntario.entity';
import { VoluntarioModule } from '../src/modules/voluntario/voluntario.module';

describe('Criar Conta de Voluntário (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await getTestingModule(
      [UsuarioDbEntity, PerfilDbEntity, AlunoDbEntity],
      [AuthModule.forRoot(), UsuarioModule, VoluntarioModule],
    );

    app = await moduleFixture.createNestApplication();
    setupApp(app);
    await app.init();
  });

  beforeEach(async () => {
    token = await getToken(app, null, TipoUsuario.ATENDENTE);
  });

  describe('/cadastro-voluntario (POST)', () => {
    const req = {
      telefone: '11912345678',
      dataNascimento: moment().subtract(18, 'year').toDate(),
      cidade: 'Acrelândia',
      UF: Estado.AC,
      genero: Genero.PREFIRO_NAO_DECLARAR,
      formado: false,
      semestre: 10,
      frentes: [FrenteAtuacao.SESSAO_ACOLHIMENTO],
      instituicao: 'Teste',
    } as CreateVoluntarioDto;

    it('Deve Cadastrar um voluntário com sucesso', async () => {
      await request(app.getHttpServer())
        .post('/cadastro-voluntario')
        .set('Authorization', `Bearer ${token}`)
        .send(req)
        .expect(201);
    });

    it('Deve Cadastrar um voluntário alterando o tipo de usuário', async () => {
      await request(app.getHttpServer())
        .post('/cadastro-voluntario')
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...req,
          tipo: TipoUsuario.SUPERVISOR,
          formado: true,
          anoFormacao: +moment().format('YYYY'),
          crp: 'Teste',
          areaAtuacao: AreaAtuacao.PSICOLOGO,
        } as CreateVoluntarioDto)
        .expect(201);
    });

    it('Deve dar erro 400 ao passar um campo inválido', async () => {
      await request(app.getHttpServer())
        .post('/cadastro-voluntario')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...req, instituicao: null } as CreateVoluntarioDto)
        .expect(400);
    });

    it('Deve dar erro 422 ao cadastrar um voluntário com informações de formação incorretas', async () => {
      await request(app.getHttpServer())
        .post('/cadastro-voluntario')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...req, formado: true } as CreateVoluntarioDto)
        .expect(422);
    });

    it('Deve dar erro 422 ao cadastrar um voluntário com informações de em formação incorretas', async () => {
      await request(app.getHttpServer())
        .post('/cadastro-voluntario')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...req, formado: false, semestre: null } as CreateVoluntarioDto)
        .expect(422);
    });

    it('Deve dar erro 401 ao tentar cadastrar sem logar', async () => {
      await request(app.getHttpServer())
        .post('/cadastro-voluntario')
        .send(req)
        .expect(401);
    });

    it('Deve dar erro 403 ao tentar cadastrar com um perfil que não seja voluntário', async () => {
      const wrongToken = await getToken(app, null, TipoUsuario.ALUNO);
      await request(app.getHttpServer())
        .post('/cadastro-voluntario')
        .set('Authorization', `Bearer ${wrongToken}`)
        .send(req)
        .expect(403);
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
