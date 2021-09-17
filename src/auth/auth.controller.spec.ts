import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { FactoryMock } from '../__old/testing/factory.mock';
import { AuthController } from './auth.controller';
import { Usuario } from '../usuario/entities/usuario.entity';

describe('AuthController', () => {
  let service: AuthService;
  let controller: AuthController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useFactory: FactoryMock.authServiceMockFactory,
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
});
