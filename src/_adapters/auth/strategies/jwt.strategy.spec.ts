import { JwtStrategy } from './jwt.strategy';
import { internet } from '@faker-js/faker/locale/pt_BR';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { TokenPayload } from '../dto/auth.dto';

describe('JwtStrategy', () => {
  const strategy = new JwtStrategy();
  const payload: TokenPayload = {
    email: internet.email(),
    sub: 1,
    roles: [TipoUsuario.ADMINISTRADOR],
    permissaoNavegar: true,
  };
  it('deve retornar um payload', async () => {
    const response = await strategy.validate(payload);
    expect(response.email).toBe(payload.email);
    expect(response.id).toBe(payload.sub);
    expect(response.roles).toBe(payload.roles);
  });
});
