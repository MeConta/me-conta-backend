import { Test, TestingModule } from '@nestjs/testing';
import { ConsultaController } from './consulta.controller';
import { ConsultaService } from './consulta.service';
import { FactoryMock } from '../testing/factory.mock';
import { ConsultaStub } from '../testing/consulta.stub';

describe('ConsultaController', () => {
  let controller: ConsultaController;
  let service: ConsultaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsultaController],
      providers: [
        {
          provide: ConsultaService,
          useFactory: FactoryMock.crudServiceMockFactory,
        },
      ],
    }).compile();

    controller = module.get<ConsultaController>(ConsultaController);
    service = module.get<ConsultaService>(ConsultaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deve chamar o create', async () => {
    await controller.create(ConsultaStub.getCreateDto());
    expect(service.create).toBeCalled();
  });

  it('deve chamar o update', async () => {
    await controller.update('1', ConsultaStub.getUpdateDto());
    expect(service.update).toBeCalled();
  });
});
