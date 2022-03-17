import { JwtRefreshTokenStrategy } from './jwt-refresh-token.strategy';
import { internet } from 'faker';
import { createMock } from '@golevelup/ts-jest';
import { Request } from 'express';

import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { TokenPayload } from '../dto/auth.dto';

describe('JwtRefreshTokenStrategy', () => {
  const refreshTokenStrategy = new JwtRefreshTokenStrategy();

  const request = createMock<Request>();

  const payload: TokenPayload = {
    email: internet.email(),
    sub: 16,
    roles: [TipoUsuario.ATENDENTE],
  };

  it('deve retornar um payload', async () => {
    const response = await refreshTokenStrategy.validate(request, payload);
    expect(response.email).toBe(payload.email);
    expect(response.id).toBe(payload.sub);
    expect(response.roles).toBe(payload.roles);
  });
});
