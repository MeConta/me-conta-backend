import { Test, TestingModule } from '@nestjs/testing';
import { FrenteAtuacaoService } from './frente-atuacao.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FrenteAtuacao } from './entities/frente-atuacao.entity';
import { FactoryMock } from '../../src/testing/factory.mock';

describe('FrenteAtuacaoService', () => {
  let service: FrenteAtuacaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(FrenteAtuacao),
          useFactory: FactoryMock.repositoryMockFactory,
        },
        FrenteAtuacaoService,
      ],
    }).compile();

    service = module.get<FrenteAtuacaoService>(FrenteAtuacaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
