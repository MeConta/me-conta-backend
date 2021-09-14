import { JwtStrategy } from './jwt.strategy';
import { internet } from 'faker';
import { TokenPayload } from '../dto';
import { Tipo } from '../../usuario/entities/usuario.enum';

describe('JwtStrategy', () => {
  const strategy = new JwtStrategy();
  const payload: TokenPayload = {
    email: internet.email(),
    sub: 1,
    roles: [Tipo.ADMINISTRADOR],
  };
  it('deve retornar um payload', async () => {
    const response = await strategy.validate(payload);
    expect(response.email).toBe(payload.email);
    expect(response.id).toBe(payload.sub);
    expect(response.roles).toBe(payload.roles);
  });
});
