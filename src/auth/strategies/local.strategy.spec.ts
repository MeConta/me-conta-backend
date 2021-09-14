import { LocalStrategy } from './local.strategy';
import { createMock } from '@golevelup/ts-jest';
import { AuthService } from '../auth.service';
import { UsuarioStub } from '../../testing/usuario.stub';
import { DEFAULT_PASSWORD } from '../../../jest.setup';
import { UnauthorizedException } from '@nestjs/common';

describe('LocalStrategy', () => {
  const authService = createMock<AuthService>();
  const entity = UsuarioStub.getEntity();
  const req = {
    email: entity.email,
    senha: DEFAULT_PASSWORD,
  };

  it('Deve ser definido ', () => {
    const strategy = new LocalStrategy(authService);
    expect(strategy).toBeDefined();
  });

  it('Deve retornar um usuário', async () => {
    authService.validateUser.mockResolvedValue(entity);
    const strategy = new LocalStrategy(authService);
    const response = await strategy.validate(req.email, req.senha);
    expect(response).toBeDefined();
    expect(response.email).toBe(entity.email);
  });

  it('Deve dar erro de UnauthorizedException', async () => {
    authService.validateUser.mockResolvedValue(null);
    const strategy = new LocalStrategy(authService);
    await expect(() => strategy.validate(req.email, req.senha)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
