import * as request from 'supertest';
import { CreateUsuarioDto } from '../src/_adapters/usuarios/dto/create-usuario.dto';
import { INestApplication, Provider } from '@nestjs/common';
import { TipoUsuario } from '../src/_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { faker } from '@faker-js/faker';
import { AuthDto, TokenDto } from '../src/_adapters/auth/dto/auth.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { DEFAULT_PASSWORD } from '../jest.setup';
import { DbE2eModule } from './modules/db-e2e.module';
import { ConfigE2eModule } from './modules/config-e2e.module';
import { MailE2EModule } from './modules/mail-e2e.module';
import { Connection } from 'typeorm';
import { UsuarioDbEntity } from '../src/_adapters/usuarios/entidades/usuario.db.entity';
import { Usuario } from '../src/_business/usuarios/entidades/usuario.entity';
import { VoluntarioDbEntity } from '../src/_adapters/voluntarios/entidades/voluntario-db.entity';
import {
  Abordagem,
  Bio,
  FrenteAtuacao,
  Voluntario,
} from '../src/_business/voluntarios/entidades/voluntario.entity';
import * as dayjs from 'dayjs';

export async function createUser(
  app: INestApplication,
  tipo: TipoUsuario = TipoUsuario.ALUNO,
  dto?: Partial<Omit<CreateUsuarioDto, 'tipo'>>,
): Promise<Usuario> {
  faker.setLocale('pt_BR');
  const { nome, email, senha } = {
    nome: dto?.nome || faker.name.fullName(),
    email: dto?.email || faker.internet.email(),
    senha: dto?.senha || DEFAULT_PASSWORD,
  };

  await request(app.getHttpServer())
    .post('/cadastro-inicial')
    .send({
      nome,
      email,
      senha,
      tipo,
    } as CreateUsuarioDto);

  const repo = app.get(Connection).getRepository(UsuarioDbEntity);
  return repo.findOne({
    where: {
      email,
    },
  });
}

export async function createVoluntario(
  app: INestApplication,
  usuario?: Usuario,
  tipo: TipoUsuario.ATENDENTE | TipoUsuario.SUPERVISOR = TipoUsuario.ATENDENTE,
  dto?: Omit<Voluntario, 'usuario'> & Partial<Bio> & Partial<Abordagem>,
): Promise<Voluntario & Partial<Bio> & Partial<Abordagem>> {
  if (!usuario) {
    usuario = await createUser(app, tipo);
  }
  faker.setLocale('pt_BR');
  const voluntarioRepo = app.get(Connection).getRepository(VoluntarioDbEntity);

  dto = {
    instituicao: dto?.instituicao || faker.lorem.words(),
    frentes: dto?.frentes || [FrenteAtuacao.COACHING_DE_ROTINA_DE_ESTUDOS],
    anoFormacao: dto?.anoFormacao || +dayjs().format('YYYY'),
    formado: dto?.formado || true,
    crp: dto?.crp || faker.lorem.words(),
    bio: dto?.bio || faker.lorem.paragraphs(),
    abordagem: dto?.abordagem || faker.lorem.words(),
    aprovado: dto?.aprovado || true,
  };
  return voluntarioRepo.save(
    voluntarioRepo.create({
      ...dto,
      usuario,
      aprovado: dto.aprovado,
    }),
  );
}

export async function getToken(
  app: INestApplication,
  tipo: TipoUsuario = TipoUsuario.ADMINISTRADOR,
  login?: AuthDto,
): Promise<string> {
  faker.setLocale('pt_BR');
  const { email, senha } = {
    email: login?.username || faker.internet.email(),
    senha: login?.password || DEFAULT_PASSWORD,
  };

  const usuarioRepo = app.get(Connection).getRepository(UsuarioDbEntity);

  const { id } =
    (await usuarioRepo.findOne({
      where: {
        email,
      },
    })) ||
    (await createUser(app, TipoUsuario.ALUNO, {
      email,
      senha,
    }));

  const usuario = await usuarioRepo.save({
    id,
    tipo,
  });

  switch (tipo) {
    case TipoUsuario.ATENDENTE:
    case TipoUsuario.SUPERVISOR:
      await createVoluntario(app, usuario);
      break;
  }

  const { body } = await request(app.getHttpServer())
    .post('/auth/login')
    .send({ username: email, password: senha } as AuthDto);

  return (body as TokenDto).token;
}

export async function getTestingModule(
  modules: any[],
  providers: Provider[] = [],
): Promise<TestingModule> {
  return Test.createTestingModule({
    imports: [DbE2eModule, ConfigE2eModule, MailE2EModule, ...modules],
    providers,
  }).compile();
}
