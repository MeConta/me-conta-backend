import * as request from 'supertest';
import { CreateUsuarioDto } from '../src/_adapters/usuarios/dto/create-usuario.dto';
import { INestApplication, Provider } from '@nestjs/common';
import { TipoUsuario } from '../src/_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { internet, name } from 'faker/locale/pt_BR';
import { AuthDto, TokenDto } from '../src/_adapters/auth/dto/auth.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import database from '../src/config/database.config';
import { DEFAULT_PASSWORD } from '../jest.setup';

export async function createUser(
  app: INestApplication,
  tipoUsuario: TipoUsuario = TipoUsuario.ALUNO,
  usuario?: Partial<CreateUsuarioDto>,
): Promise<CreateUsuarioDto> {
  const { nome, email, senha, tipo } = usuario || {
    nome: name.firstName(),
    email: internet.email(),
    senha: DEFAULT_PASSWORD,
    tipo: tipoUsuario,
  };
  await request(app.getHttpServer())
    .post('/cadastro-inicial')
    .send({
      nome,
      email,
      senha,
      tipo,
    } as CreateUsuarioDto);
  return Promise.resolve({
    nome,
    email,
    senha,
    tipo,
  });
}

export async function getToken(
  app: INestApplication,
  login?: AuthDto,
  tipo: TipoUsuario = TipoUsuario.ADMINISTRADOR,
): Promise<string> {
  const { username, password } = login || {
    username: internet.email(),
    password: DEFAULT_PASSWORD,
  };

  await request(app.getHttpServer())
    .post('/cadastro-inicial')
    .send({
      nome: name.firstName(),
      email: username,
      senha: password,
      tipo,
    } as CreateUsuarioDto);

  const { body } = await request(app.getHttpServer())
    .post('/auth/login')
    .send({ username, password });

  return (body as TokenDto).token;
}

export async function getTestingModule(
  entities: any[],
  modules: any[],
  providers: Provider[] = [],
): Promise<TestingModule> {
  return Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        type: 'better-sqlite3',
        database: ':memory:',
        dropSchema: true,
        logging: false,
        autoLoadEntities: true,
        entities: entities,
        synchronize: true,
      }),
      ConfigModule.forRoot({
        isGlobal: true,
        load: [database],
        envFilePath: ['.env.test'],
        expandVariables: true,
      }),
      ...modules,
    ],
    providers,
  }).compile();
}
