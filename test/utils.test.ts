import { internet } from 'faker/locale/pt_BR';
import * as request from 'supertest';
import { createMock } from '@golevelup/ts-jest';
import { CreateUsuarioDto } from '../src/_adapters/usuarios/dto/create-usuario.dto';

const req = {
  ...createMock<CreateUsuarioDto>(),
  email: internet.email(),
  senha: internet.password(),
} as CreateUsuarioDto;

export async function getAuthToken(
  app,
  email?: string,
  senha?: string,
): Promise<string> {
  const response = await request(app.getHttpServer())
    .post(`/auth/login`)
    .send({
      username: email || req.email,
      password: senha || req.senha,
    });

  return response.body.token;
}

export async function getAdminAuthToken(app): Promise<string> {
  const response = await request(app.getHttpServer())
    .post(`/usuario`)
    .send({
      ...req,
      email: internet.email(),
    });

  return getAuthToken(app, response.body.email);
}
