import { Test, TestingModule } from '@nestjs/testing';
import { SupervisorController } from './supervisor.controller';
import { SupervisorService } from './supervisor.service';
import { FrenteAtuacaoService } from '../frente-atuacao/frente-atuacao.service';
import { FactoryMock } from '../testing/factory.mock';
import { UsuarioService } from '../usuario/usuario.service';

describe('SupervisorController', () => {
  let controller: SupervisorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupervisorController],
      providers: [
        {
          provide: FrenteAtuacaoService,
          useFactory: FactoryMock.crudServiceMockFactory,
        },
        {
          provide: UsuarioService,
          useFactory: FactoryMock.crudServiceMockFactory,
        },
        {
          provide: SupervisorService,
          useFactory: FactoryMock.crudServiceMockFactory,
        },
      ],
    }).compile();

    controller = module.get<SupervisorController>(SupervisorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
