import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let usuarioService: UsuarioService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsuarioService,
          useValue: { findOneByEmail: jest.fn() },
        },
        {
          provide: JwtService,
          useValue: [{ sign: jest.fn() }],
        },
        AuthService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usuarioService = module.get<UsuarioService>(UsuarioService);
  });

  it('should validate user login', () => {
    //jest
    //    .spyOn(usuarioService, 'findOneByEmail')
    //    .mockResolvedValue(UsuarioStub.getEntity());
    // expect(service.validateUser('teste', 'teste')).toBe('teste');
  });

  it('should be defined', () => {
    // expect(service).toBeDefined();
  });
});
