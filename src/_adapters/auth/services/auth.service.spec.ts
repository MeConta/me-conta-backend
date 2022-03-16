import {
  AuthService,
  NestAuthService,
  NestLoginService,
  NestLogoutService,
} from './auth.service';
import { createMock } from '@golevelup/ts-jest';
import { Usuario } from '../../../_business/usuarios/entidades/usuario.entity';
import { IHashCompareService } from '../../../_business/usuarios/services/hash.service';
import { IJwtService } from '../../../_business/auth/interfaces/jwt.service';
import {
  IAtualizarUsuarioService,
  IBuscarUsuarioViaEmailService,
} from '../../../_business/usuarios/services/usuario.service';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { IBuscarUsuarioViaId } from 'src/_business/usuarios/casos-de-uso/buscar-usuario.id.feat';

describe('AuthService', () => {
  let service: AuthService;

  let auth: NestAuthService;
  let login: NestLoginService;
  let logout: NestLogoutService;

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
    logout = new NestLogoutService(
      createMock<
        IBuscarUsuarioViaEmailService &
          IBuscarUsuarioViaId &
          IAtualizarUsuarioService
      >(),
    );
    service = new AuthService(auth, login, logout);
  });

  beforeEach(async () => {
    jest.spyOn(auth, 'execute').mockResolvedValue(entity);
    jest.spyOn(login, 'execute').mockReturnValue({
      token: 'TOKEN',
      tipo: TipoUsuario.ADMINISTRADOR,
      nome: 'Teste',
    });
    jest.spyOn(logout, 'execute').mockResolvedValue();
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

  describe('logout', () => {
    it('Deve chamar o logout', async () => {
      await service.logout(expect.any(Number));
      expect(logout.execute).toBeCalledWith(
        expect.any(Number),
        expect.any(Object),
      );
    });
  });
});
