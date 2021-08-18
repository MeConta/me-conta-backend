import { Test, TestingModule } from '@nestjs/testing';
import { AtendenteService } from './atendente.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Atendente } from './entities/atendente.entity';
import { FactoryMock } from '../testing/factory.mock';

describe('AtendenteService', () => {
  let service: AtendenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Atendente),
          useFactory: FactoryMock.repositoryMockFactory,
        },
        AtendenteService,
      ],
    }).compile();

    service = module.get<AtendenteService>(AtendenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
