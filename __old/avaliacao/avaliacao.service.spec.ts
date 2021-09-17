import { Test, TestingModule } from '@nestjs/testing';
import { AvaliacaoService } from './avaliacao.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Avaliacao } from './entities/avaliacao.entity';
import { FactoryMock } from '../../src/testing/factory.mock';

describe('AvaliacaoService', () => {
  let service: AvaliacaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Avaliacao),
          useFactory: FactoryMock.repositoryMockFactory,
        },
        AvaliacaoService,
      ],
    }).compile();

    service = module.get<AvaliacaoService>(AvaliacaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
