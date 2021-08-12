import { Test, TestingModule } from '@nestjs/testing';
import { FrenteAtuacaoController } from './frente-atuacao.controller';
import { FrenteAtuacaoService } from './frente-atuacao.service';

describe('FrenteAtuacaoController', () => {
  let controller: FrenteAtuacaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FrenteAtuacaoController],
      providers: [FrenteAtuacaoService],
    }).compile();

    controller = module.get<FrenteAtuacaoController>(FrenteAtuacaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
