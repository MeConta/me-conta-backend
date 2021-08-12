import { Test, TestingModule } from '@nestjs/testing';
import { AtendenteController } from './atendente.controller';
import { AtendenteService } from './atendente.service';

describe('AtendenteController', () => {
  let controller: AtendenteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AtendenteController],
      providers: [AtendenteService],
    }).compile();

    controller = module.get<AtendenteController>(AtendenteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
