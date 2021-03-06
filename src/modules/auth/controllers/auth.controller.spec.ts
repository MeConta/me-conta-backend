import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../../_adapters/auth/services/auth.service';
import { AuthController } from './auth.controller';
import { Usuario } from '../../../_business/usuarios/entidades/usuario.entity';
import { createMock } from '@golevelup/ts-jest';

describe('AuthController', () => {
  let service: AuthService;
  let controller: AuthController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: createMock<AuthService>(),
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('deve ser definido', async () => {
    expect(controller).toBeDefined();
  });

  it('deve chamar o serviço de login', async () => {
    await controller.login({
      user: { email: 'foo@bar.com', senha: 's3nH4VAl1d@' } as Usuario,
    });

    expect(service.login).toBeCalled();
  });

  it('deve chamar o serviço de logout', async () => {
    await controller.logout({ id: expect.any(Number) });

    expect(service.logout).toBeCalled();
  });

  it('deve chamar o serviço de refresh token', async () => {
    await controller.refresh(
      { refreshToken: expect.any(String) },
      { id: expect.any(Number) },
    );

    expect(service.refreshTokens).toBeCalled();
  });
});
