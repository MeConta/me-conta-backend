import { Test, TestingModule } from '@nestjs/testing';
import { AgendaController } from './agenda.controller';
import { AgendaService } from './agenda.service';
import { FactoryMock } from '../../src/testing/factory.mock';
import { AgendaStub } from '../testing/agenda.stub';

describe('AgendaController', () => {
  let controller: AgendaController;
  let service: AgendaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgendaController],
      providers: [
        {
          provide: AgendaService,
          useFactory: FactoryMock.crudServiceMockFactory,
        },
      ],
    }).compile();

    controller = module.get<AgendaController>(AgendaController);
    service = module.get<AgendaService>(AgendaService);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  it('Deve chamar o serviço de criação de agenda', () => {
    jest.spyOn(service, 'create');
    controller.create(AgendaStub.getCreateDto());
    expect(service.create).toBeCalled();
  });

  it('Deve chamar o serviço de atualização de agenda', () => {
    jest.spyOn(service, 'create');
    controller.update(1, AgendaStub.getUpdateDto());
    expect(service.update).toBeCalled();
  });
});
