import { Test, TestingModule } from '@nestjs/testing';
import { FrenteAtuacaoService } from './frente-atuacao.service';

describe('FrenteAtuacaoService', () => {
  let service: FrenteAtuacaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FrenteAtuacaoService],
    }).compile();

    service = module.get<FrenteAtuacaoService>(FrenteAtuacaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
