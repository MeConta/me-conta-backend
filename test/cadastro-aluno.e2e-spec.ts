import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CadastroInicialModule } from '../src/cadastro-inicial/cadastro-inicial.module';
import { TipoUsuario } from '../src/_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioDbEntity } from '../src/_adapters/usuarios/entidades/usuario.db.entity';
import { setupApp } from '../src/config/app.config';
import { getToken } from './utils.test';
import { AlunoDbEntity } from '../src/_adapters/alunos/entidades/aluno.db.entity';
import { PerfilDbEntity } from '../src/_adapters/perfil/entidades/perfil.db.entity';
import { CadastroAlunoModule } from '../src/cadastro-aluno/cadastro-aluno.module';
import { CreateAlunoDto } from '../src/_adapters/alunos/dto/create-aluno.dto';
import {
  Estado,
  Genero,
} from '../src/_business/usuarios/entidades/usuario.entity';
import {
  Escolaridade,
  TipoEscola,
} from '../src/_business/alunos/entidades/aluno.entity';
import { AuthModule } from '../src/auth/auth.module';

describe('Criar Conta (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: ':memory:',
          dropSchema: true,
          logging: false,
          autoLoadEntities: true,
          entities: [UsuarioDbEntity, PerfilDbEntity, AlunoDbEntity],
          synchronize: true,
        }),
        AuthModule.forRoot(),
        CadastroInicialModule,
        CadastroAlunoModule,
      ],
    }).compile();

    app = await moduleFixture.createNestApplication();
    setupApp(app);
    await app.init();
  });

  beforeEach(async () => {
    token = await getToken(app, null, TipoUsuario.ALUNO);
  });

  describe('/cadastro-aluno (POST)', () => {
    const req = {
      telefone: '11912345678',
      cidade: 'Acrelândia',
      dataNascimento: new Date(1996, 7, 12),
      estado: Estado.AC,
      genero: Genero.PREFIRO_NAO_DECLARAR,
      tipoEscola: TipoEscola.PUBLICA,
      escolaridade: Escolaridade.PRIMEIRO_ANO,
    } as CreateAlunoDto;

    it('Deve Cadastrar um aluno com sucesso', async () => {
      await request(app.getHttpServer())
        .post('/cadastro-aluno')
        .set('Authorization', `Bearer ${token}`)
        .send(req)
        .expect(201);
    });

    it('Deve dar erro 400 ao passar um campo inválido', async () => {
      await request(app.getHttpServer())
        .post('/cadastro-aluno')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...req, tipoEscola: null } as CreateAlunoDto)
        .expect(400);
    });

    it('Deve dar erro 401 ao tentar cadastrar sem logar', async () => {
      await request(app.getHttpServer())
        .post('/cadastro-aluno')
        .send(req)
        .expect(401);
    });

    it('Deve dar erro 403 ao tentar cadastrar com um perfil que não seja aluno', async () => {
      const wrongToken = await getToken(app, null, TipoUsuario.SUPERVISOR);
      await request(app.getHttpServer())
        .post('/cadastro-aluno')
        .set('Authorization', `Bearer ${wrongToken}`)
        .send(req)
        .expect(403);
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
