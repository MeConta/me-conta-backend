import { Test, TestingModule } from '@nestjs/testing';
import { AvaliacaoController } from './avaliacao.controller';
import { AvaliacaoService } from './avaliacao.service';
import { FactoryMock } from '../testing/factory.mock';
import { AvaliacaoStub } from '../testing/avaliacao.stub';

describe('AvaliacaoController', () => {
  let controller: AvaliacaoController;
  let service: AvaliacaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvaliacaoController],
      providers: [
        {
          provide: AvaliacaoService,
          useFactory: FactoryMock.crudServiceMockFactory,
        },
      ],
    }).compile();

    controller = module.get<AvaliacaoController>(AvaliacaoController);
    service = module.get<AvaliacaoService>(AvaliacaoService);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve chamar o create', async () => {
    await controller.create(AvaliacaoStub.getCreateDto());
    expect(service.create).toBeCalled();
  });

  it('deve chamar o update', async () => {
    await controller.update(1, AvaliacaoStub.getUpdateDto());
    expect(service.update).toBeCalled();
  });
});
