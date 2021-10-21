import { AuthService, NestAuthService, NestLoginService } from './auth.service';
import { createMock } from '@golevelup/ts-jest';
import { Usuario } from '../../../_business/usuarios/entidades/usuario.entity';
import { IHashCompareService } from '../../../_business/usuarios/services/hash.service';
import { IJwtService } from '../../../_business/auth/interfaces/jwt.service';
import { IBuscarUsuarioViaEmailService } from '../../../_business/usuarios/services/usuario.service';

describe('AuthService', () => {
  let service: AuthService;

  let auth: NestAuthService;
  let login: NestLoginService;

  const entity = {
    ...createMock<Usuario>(),
    id: 0,
    nome: 'Teste',
    email: 'teste@teste.com',
  } as Usuario;

  beforeEach(async () => {
    auth = new NestAuthService(
      createMock<IBuscarUsuarioViaEmailService>(),
      createMock<IHashCompareService>(),
    );
    login = new NestLoginService(createMock<IJwtService>());
    service = new AuthService(auth, login);
  });

  beforeEach(async () => {
    jest.spyOn(auth, 'execute').mockResolvedValue(entity);
    jest.spyOn(login, 'execute').mockReturnValue({ token: 'TOKEN' });
  });

  it('deve ser definido', async () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('Deve chamar a validação de usuário', async () => {
      await service.validateUser(expect.any(String), expect.any(String));
      expect(auth.execute).toBeCalledWith(
        expect.any(String),
        expect.any(String),
      );
    });
  });

  describe('login', () => {
    it('Deve chamar a assinatura de token', async () => {
      await service.login(entity);
      expect(login.execute).toBeCalledWith(entity);
    });
  });
});
