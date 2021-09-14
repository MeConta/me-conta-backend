import { internet } from 'faker/locale/pt_BR';
import * as request from 'supertest';
import { UsuarioStub } from '../src/testing/usuario.stub';

export async function getAuthToken(
  app,
  email?: string,
  senha?: string,
): Promise<string> {
  const response = await request(app.getHttpServer())
    .post(`/auth/login`)
    .send({
      username: email || UsuarioStub.getCreateDto().email,
      password: senha || UsuarioStub.getCreateDto().senha,
    });

  return response.body.token;
}

export async function getAdminAuthToken(app): Promise<string> {
  const response = await request(app.getHttpServer())
    .post(`/usuario`)
    .send({
      ...UsuarioStub.getCreateDto(),
      email: internet.email(),
    });

  return getAuthToken(app, response.body.email);
}
