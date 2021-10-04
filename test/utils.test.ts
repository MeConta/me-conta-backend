import * as request from 'supertest';
import { CreateUsuarioDto } from '../src/_adapters/usuarios/dto/create-usuario.dto';
import { INestApplication } from '@nestjs/common';
import { TipoUsuario } from '../src/_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { internet, name } from 'faker/locale/pt_BR';
import { AuthDto, TokenDto } from '../src/_adapters/auth/dto/auth.dto';

export const SENHA_PADRAO = 's3nh4Val!d@';
export async function createUser(
  app: INestApplication,
  tipoUsuario: TipoUsuario = TipoUsuario.ALUNO,
  usuario?: CreateUsuarioDto,
): Promise<CreateUsuarioDto> {
  const { nome, email, senha, tipo } = usuario || {
    nome: name.firstName(),
    email: internet.email(),
    senha: SENHA_PADRAO,
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
    password: SENHA_PADRAO,
  };
  await createUser(app, tipo, {
    nome: name.firstName(),
    email: username,
    senha: password,
    tipo: tipo,
  });

  const { body } = await request(app.getHttpServer())
    .post('/auth/login')
    .send({ username, password });

  return (body as TokenDto).token;
}
