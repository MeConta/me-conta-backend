import {
  AuthService,
  NestAuthService,
  NestLoginService,
  NestLogoutService,
  NestValidaUsuarioComRefreshTokenService,
  NestValidaVoluntarioComPerfilCompleto,
  NestValidaAlunoComPerfilCompleto,
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
import { IBuscarAlunoViaId } from '../../../_business/alunos/services/alunos.service';
import { IBuscarPerfilByIdService } from '../../../_business/perfil/services/perfil.service';
import { Voluntario } from 'src/_business/voluntarios/entidades/voluntario.entity';

describe('AuthService', () => {
  let service: AuthService;
  let auth: NestAuthService;
  let login: NestLoginService;
  let logout: NestLogoutService;
  let hash: BcryptHashService;
  let validaUsuarioComRefreshToken: NestValidaUsuarioComRefreshTokenService;
  let validaVoluntarioComPerfilCompleto: NestValidaVoluntarioComPerfilCompleto;
  let validaAlunoComPerfilCompleto: NestValidaAlunoComPerfilCompleto;

  const entity = {
    ...createMock<Usuario>(),
    id: 0,
    nome: 'Teste',
    email: 'teste@teste.com',
    tipo: TipoUsuario.ATENDENTE,
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
        createMock<IBuscarPerfilByIdService>(),
      );
    validaAlunoComPerfilCompleto = new NestValidaAlunoComPerfilCompleto(
      createMock<IBuscarAlunoViaId>(),
    );

    service = new AuthService(
      auth,
      login,
      logout,
      hash,
      validaUsuarioComRefreshToken,
      validaVoluntarioComPerfilCompleto,
      validaAlunoComPerfilCompleto,
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
      permissaoNavegar: false,
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

    it('Deve returnar permissaoNavegar falso quando o usuário é do tipo atendente and reprovado', async () => {
      entity.salt = await hash.generateSalt();
      const voluntario = { aprovado: false } as Voluntario;
      jest
        .spyOn(validaVoluntarioComPerfilCompleto, 'execute')
        .mockResolvedValue(voluntario);
      const loginResult = await service.login(entity);

      expect(loginResult).toEqual({
        nome: 'Teste',
        perfilCompleto: true,
        permissaoNavegar: false,
        refreshToken: 'REFRESH-TOKEN',
        tipo: 3,
        token: 'TOKEN',
      });
      expect(login.execute).toBeCalledWith(entity);
    });

    it('Deve returnar permissaoNavegar falso quando o usuário é do tipo atendente e aprovado é null', async () => {
      entity.salt = await hash.generateSalt();
      const voluntario = { aprovado: null } as Voluntario;
      jest
        .spyOn(validaVoluntarioComPerfilCompleto, 'execute')
        .mockResolvedValue(voluntario);
      const loginResult = await service.login(entity);

      expect(loginResult).toEqual({
        nome: 'Teste',
        perfilCompleto: true,
        permissaoNavegar: false,
        refreshToken: 'REFRESH-TOKEN',
        tipo: 3,
        token: 'TOKEN',
      });
      expect(login.execute).toBeCalledWith(entity);
    });

    it('Deve retornar permissaoNavegar true quando o usuário é do tipo atendente e aprovado é true', async () => {
      entity.salt = await hash.generateSalt();
      const voluntario = { aprovado: true } as Voluntario;
      jest
        .spyOn(validaVoluntarioComPerfilCompleto, 'execute')
        .mockResolvedValue(voluntario);
      const loginResult = await service.login(entity);

      expect(loginResult).toEqual({
        nome: 'Teste',
        perfilCompleto: true,
        permissaoNavegar: true,
        refreshToken: 'REFRESH-TOKEN',
        tipo: 3,
        token: 'TOKEN',
      });
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
