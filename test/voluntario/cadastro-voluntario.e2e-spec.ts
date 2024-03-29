import { TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsuarioModule } from '../../src/modules/usuario/usuario.module';
import { TipoUsuario } from '../../src/_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { setupApp } from '../../src/config/app.config';
import { getTestingModule, getToken } from '../utils.test';
import { faker } from '@faker-js/faker';

import { AuthModule } from '../../src/modules/auth/auth.module';
import { CreateVoluntarioDto } from '../../src/_adapters/voluntarios/dto/create-voluntario.dto';
import * as dayjs from 'dayjs';
import {
  Estado,
  Genero,
} from '../../src/_business/usuarios/entidades/usuario.entity';
import {
  AreaAtuacao,
  FrenteAtuacao,
} from '../../src/_business/voluntarios/entidades/voluntario.entity';
import { VoluntarioModule } from '../../src/modules/voluntario/voluntario.module';

describe('Criar Conta de Voluntário (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await getTestingModule([
      AuthModule,
      UsuarioModule,
      VoluntarioModule,
    ]);

    app = moduleFixture.createNestApplication();
    setupApp(app);
    await app.init();
  });

  beforeEach(async () => {
    token = await getToken(app, TipoUsuario.ATENDENTE);
  });

  describe('/cadastro-voluntario (POST)', () => {
    faker.setLocale('pt_BR');
    const req = {
      telefone: '11912345678',
      dataNascimento: dayjs().subtract(18, 'year').toDate(),
      cidade: faker.address.city(),
      UF: Estado.AC,
      genero: Genero.PREFIRO_NAO_DECLARAR,
      formado: false,
      semestre: 10,
      frentes: [FrenteAtuacao.SESSAO_ACOLHIMENTO],
      instituicao: faker.lorem.word(3),
      tipo: TipoUsuario.ATENDENTE,
      bio: faker.lorem.paragraphs(3),
    } as CreateVoluntarioDto;

    it('Deve Cadastrar um voluntário com sucesso', async () => {
      await request(app.getHttpServer())
        .post('/cadastro-voluntario')
        .set('Authorization', `Bearer ${token}`)
        .send(req)
        .expect(HttpStatus.CREATED);
    });

    it('Deve Cadastrar um voluntário alterando o tipo de usuário', async () => {
      await request(app.getHttpServer())
        .post('/cadastro-voluntario')
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...req,
          tipo: TipoUsuario.SUPERVISOR,
          formado: true,
          anoFormacao: +dayjs().format('YYYY'),
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
      const wrongToken = await getToken(app, TipoUsuario.ALUNO);
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
