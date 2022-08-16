import { JwtRefreshTokenStrategy } from './jwt-refresh-token.strategy';
import { faker } from '@faker-js/faker';

import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { TokenPayload } from '../dto/auth.dto';

describe('JwtRefreshTokenStrategy', () => {
  faker.setLocale('pt_BR');
  const refreshTokenStrategy = new JwtRefreshTokenStrategy();

  const payload: TokenPayload = {
    email: faker.internet.email(),
    sub: 16,
    roles: [TipoUsuario.ATENDENTE],
    permissaoNavegar: true,
  };

  it('deve retornar um payload', async () => {
    const response = await refreshTokenStrategy.validate(payload);
    expect(response.email).toBe(payload.email);
    expect(response.id).toBe(payload.sub);
    expect(response.roles).toBe(payload.roles);
  });
});
