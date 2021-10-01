import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { TypeormUsuarioService } from '../_adapters/usuarios/typeorm-usuario.service';
import { createMock } from '@golevelup/ts-jest';
import { Usuario } from '../_business/usuarios/entidades/usuario.entity';
import { CreateUsuarioDto } from '../_adapters/usuarios/dto/create-usuario.dto';
import { TipoUsuario } from '../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';

describe('AuthService', () => {
  let service: AuthService;
  let usuarioService: TypeormUsuarioService;
  let jwtService: JwtService;

  const request = createMock<CreateUsuarioDto>();
  const entity = createMock<Usuario>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TypeormUsuarioService,
          useValue: createMock<TypeormUsuarioService>(),
        },
        {
          provide: JwtService,
          useValue: { sign: jest.fn() },
        },
        AuthService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usuarioService = module.get<TypeormUsuarioService>(TypeormUsuarioService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('deve ser definido', async () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('deve retornar um usuário válido', async () => {
      jest.spyOn(usuarioService, 'findByEmail').mockResolvedValue(entity);

      const response = await service.validateUser(request.email, request.senha);
      expect(response).toBeDefined();
    });

    it('deve retornar nulo quando o usuário não for válido', async () => {
      jest.spyOn(usuarioService, 'findByEmail').mockResolvedValue(entity);
      const req = {
        ...request,
        senha: 'outraS3nh@',
      };
      const response = await service.validateUser(req.email, req.senha);
      expect(response).toBeNull();
    });

    it('deve retornar nulo quando o usuário não existir', async () => {
      jest.spyOn(usuarioService, 'findByEmail').mockResolvedValue(null);

      const response = await service.validateUser(request.email, request.senha);
      expect(response).toBeNull();
    });
  });

  describe('login', () => {
    it('deve assinar um jwt', async () => {
      await service.login({
        ...entity,
        email: `teste@teste.com`,
        id: 1,
        tipoUsuario: TipoUsuario.ADMINISTRADOR,
      });
      expect(jwtService.sign).toBeCalledWith({
        email: `teste@teste.com`,
        sub: 1,
        roles: [TipoUsuario.ADMINISTRADOR],
      });
    });
  });
});
