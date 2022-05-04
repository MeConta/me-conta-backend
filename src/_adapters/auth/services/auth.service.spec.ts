import {
  AuthService,
  NestAuthService,
  NestLoginService,
  NestLogoutService,
  NestValidaUsuarioComRefreshTokenService,
  NestValidaVoluntarioComPerfilCompleto,
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
import { IBuscarUsuarioViaId } from '../../../_business/usuarios/casos-de-uso/buscar-usuario.id.feat';
import { BcryptHashService } from '../../../_adapters/usuarios/services/bcrypt-hash.service';
import { IBuscarVoluntarioViaId } from '../../../_business/voluntarios/services/voluntario.service';

describe('AuthService', () => {
  let service: AuthService;

  let auth: NestAuthService;
  let login: NestLoginService;
  let logout: NestLogoutService;
  let hash: BcryptHashService;
  let validaUsuarioComRefreshToken: NestValidaUsuarioComRefreshTokenService;
  let validaVoluntarioComPerfilCompleto: NestValidaVoluntarioComPerfilCompleto;

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
    hash = new BcryptHashService();
    validaUsuarioComRefreshToken = new NestValidaUsuarioComRefreshTokenService(
      createMock<IBuscarUsuarioViaId>(),
      createMock<IHashCompareService>(),
    );
    validaVoluntarioComPerfilCompleto =
      new NestValidaVoluntarioComPerfilCompleto(
        createMock<IBuscarVoluntarioViaId>(),
      );

    service = new AuthService(
      auth,
      login,
      logout,
      hash,
      validaUsuarioComRefreshToken,
      validaVoluntarioComPerfilCompleto,
    );
  });

  beforeEach(async () => {
    jest.spyOn(auth, 'execute').mockResolvedValue(entity);
    jest.spyOn(login, 'execute').mockReturnValue({
      token: 'TOKEN',
      refreshToken: 'REFRESH-TOKEN',
      tipo: TipoUsuario.ADMINISTRADOR,
      nome: 'Teste',
      perfilCompleto: false,
    });
    jest.spyOn(logout, 'execute').mockResolvedValue();
    jest
      .spyOn(validaUsuarioComRefreshToken, 'execute')
      .mockResolvedValue(entity);
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
      entity.salt = await hash.generateSalt();

      await service.login(entity);
      expect(login.execute).toBeCalledWith(entity);
    });
  });

  describe('logout', () => {
    it('Deve chamar o logout', async () => {
      service.logout(expect.any(Number));
      expect(logout.execute).toBeCalledWith(
        expect.any(Number),
        expect.any(Object),
      );
    });
  });

  describe('refreshTokens', () => {
    it('Deve chamar o refreshTokens', async () => {
      await service.refreshTokens(expect.any(String), expect.any(Number));
      expect(validaUsuarioComRefreshToken.execute).toBeCalledWith(
        expect.any(String),
        expect.any(Number),
      );
    });
  });
});
