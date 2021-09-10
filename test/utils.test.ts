import * as request from 'supertest';
import { UsuarioStub } from '../src/testing/usuario.stub';

export async function getAuthToken(app, email?: string, senha?: string) {
  const response = await request(app.getHttpServer())
    .post(`/auth/login`)
    .send({
      username: email || UsuarioStub.getCreateDto().email,
      password: senha || UsuarioStub.getCreateDto().senha,
    });

  return response.body.token;
}
