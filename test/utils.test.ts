import * as request from 'supertest';
import { CreateUsuarioDto } from '../src/_adapters/usuarios/dto/create-usuario.dto';
import { INestApplication, Provider } from '@nestjs/common';
import { TipoUsuario } from '../src/_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { internet, name } from 'faker/locale/pt_BR';
import { AuthDto, TokenDto } from '../src/_adapters/auth/dto/auth.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { DEFAULT_PASSWORD } from '../jest.setup';
import { DbE2eModule } from './modules/db-e2e.module';
import { ConfigE2eModule } from './modules/config-e2e.module';
import { MailE2EModule } from './modules/mail-e2e.module';
import { Connection } from 'typeorm';
import { UsuarioDbEntity } from '../src/_adapters/usuarios/entidades/usuario.db.entity';
import { Usuario } from '../src/_business/usuarios/entidades/usuario.entity';

export async function createUser(
  app: INestApplication,
  tipo: TipoUsuario = TipoUsuario.ALUNO,
  dto?: Partial<Omit<CreateUsuarioDto, 'tipo'>>,
): Promise<Usuario> {
  const { nome, email, senha } = {
    nome: dto?.nome || name.findName(),
    email: dto?.email || internet.email(),
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

  const repo = await app.get(Connection).getRepository(UsuarioDbEntity);
  return repo.findOne({
    where: {
      email,
    },
  });
}

export async function getToken(
  app: INestApplication,
  tipo: TipoUsuario = TipoUsuario.ADMINISTRADOR,
  login?: AuthDto,
): Promise<string> {
  const { email, senha } = {
    email: login?.username || internet.email(),
    senha: login?.password || DEFAULT_PASSWORD,
  };

  const repo = await app.get(Connection).getRepository(UsuarioDbEntity);

  const { id } =
    (await repo.findOne({
      where: {
        email,
      },
    })) ||
    (await createUser(app, TipoUsuario.ALUNO, {
      email,
      senha,
    }));

  await repo.save({
    id,
    tipo,
  });

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
