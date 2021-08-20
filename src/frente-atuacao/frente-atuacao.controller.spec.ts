import { Test, TestingModule } from '@nestjs/testing';
import { FrenteAtuacaoController } from './frente-atuacao.controller';
import { FrenteAtuacaoService } from './frente-atuacao.service';
import { FactoryMock } from '../testing/factory.mock';
import { FrenteAtuacaoStub } from '../testing/FrenteAtuacao.stub';

describe('FrenteAtuacaoController', () => {
  let controller: FrenteAtuacaoController;
  let service: FrenteAtuacaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FrenteAtuacaoController],
      providers: [
        {
          provide: FrenteAtuacaoService,
          useFactory: FactoryMock.crudServiceMockFactory,
        },
      ],
    }).compile();

    controller = module.get<FrenteAtuacaoController>(FrenteAtuacaoController);
    service = module.get<FrenteAtuacaoService>(FrenteAtuacaoService);
  });

  it('Deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve chamar o create', async () => {
    await controller.create(FrenteAtuacaoStub.getCreateDto());
    expect(service.create).toBeCalled();
  });

  it('deve chamar o update', async () => {
    await controller.update('1', FrenteAtuacaoStub.getUpdateDto());
    expect(service.update).toBeCalled();
  });
});
