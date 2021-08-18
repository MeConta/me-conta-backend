import { Test, TestingModule } from '@nestjs/testing';
import { AtendenteController } from './atendente.controller';
import { AtendenteService } from './atendente.service';
import { FactoryMock } from '../testing/factory.mock';

describe('AtendenteController', () => {
  let controller: AtendenteController;
  let service: AtendenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AtendenteController],
      providers: [
        {
          provide: AtendenteService,
          useFactory: FactoryMock.serviceMockFactory,
        },
      ],
    }).compile();

    controller = module.get<AtendenteController>(AtendenteController);
    service = module.get<AtendenteService>(AtendenteService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
