import { Test, TestingModule } from '@nestjs/testing';
import { AtendenteController } from './atendente.controller';
import { AtendenteService } from './atendente.service';
import { FactoryMock } from '../testing/factory.mock';
import { AtendenteStub } from '../testing/atendente.stub';

describe('AtendenteController', () => {
  let controller: AtendenteController;
  let service: AtendenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AtendenteController],
      providers: [
        {
          provide: AtendenteService,
          useFactory: FactoryMock.crudServiceMockFactory,
        },
      ],
    }).compile();

    controller = module.get<AtendenteController>(AtendenteController);
    service = module.get<AtendenteService>(AtendenteService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deve chamar o create', async () => {
    await controller.create(AtendenteStub.getCreateDto());
    expect(service.create).toBeCalled();
  });

  it('deve chamar o update', async () => {
    await controller.update('1', AtendenteStub.getUpdateDto());
    expect(service.update).toBeCalled();
  });
});
