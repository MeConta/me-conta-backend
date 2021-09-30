import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsuarioService } from '../../__old/usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { FactoryMock } from '../testing/factory.mock';
import { UsuarioStub } from '../testing/usuario.stub';

describe('AuthService', () => {
  let service: AuthService;
  let usuarioService: UsuarioService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsuarioService,
          useValue: {
            ...FactoryMock.crudServiceMockFactory(),
            findOneByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: { sign: jest.fn() },
        },
        AuthService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usuarioService = module.get<UsuarioService>(UsuarioService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('deve ser definido', async () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('deve retornar um usuário válido', async () => {
      jest
        .spyOn(usuarioService, 'findOneByEmail')
        .mockResolvedValue(UsuarioStub.getEntity());
      const req = UsuarioStub.getCreateDto();

      const response = await service.validateUser(req.email, req.senha);
      expect(response).toBeDefined();
    });

    it('deve retornar nulo quando o usuário não for válido', async () => {
      jest
        .spyOn(usuarioService, 'findOneByEmail')
        .mockResolvedValue(UsuarioStub.getEntity());
      const req = {
        ...UsuarioStub.getCreateDto(),
        senha: 'outraS3nh@',
      };
      const response = await service.validateUser(req.email, req.senha);
      expect(response).toBeNull();
    });

    it('deve retornar nulo quando o usuário não existir', async () => {
      jest.spyOn(usuarioService, 'findOneByEmail').mockResolvedValue(null);
      const req = UsuarioStub.getCreateDto();

      const response = await service.validateUser(req.email, req.senha);
      expect(response).toBeNull();
    });
  });

  describe('login', () => {
    it('deve assinar um jwt', async () => {
      const req = UsuarioStub.getEntity();
      await service.login(req);
      expect(jwtService.sign).toBeCalledWith({
        email: req.email,
        sub: req.id,
        roles: [req.tipoUsuario],
      });
    });
  });
});
