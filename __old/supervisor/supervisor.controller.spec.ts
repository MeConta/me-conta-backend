import { Test, TestingModule } from '@nestjs/testing';
import { SupervisorController } from './supervisor.controller';
import { SupervisorService } from './supervisor.service';
import { FrenteAtuacaoService } from '../frente-atuacao/frente-atuacao.service';
import { FactoryMock } from '../../src/testing/factory.mock';
import { UsuarioService } from '../../src/usuario/usuario.service';
import { SupervisorStub } from '../testing/supervisor.stub';

describe('SupervisorController', () => {
  let controller: SupervisorController;
  let service: SupervisorService;

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
    service = module.get<SupervisorService>(SupervisorService);
  });

  it('deve  ser definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve chamar o create', async () => {
    await controller.create(SupervisorStub.getCreateDto());
    expect(service.create).toBeCalled();
  });

  it('deve chamar o update', async () => {
    await controller.update(1, SupervisorStub.getUpdateDto());
    expect(service.update).toBeCalled();
  });
});
