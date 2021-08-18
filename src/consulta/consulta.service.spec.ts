import { Test, TestingModule } from '@nestjs/testing';
import { ConsultaService } from './consulta.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Consulta } from './entities/consulta.entity';
import { FactoryMock } from '../testing/factory.mock';

describe('ConsultaService', () => {
  let service: ConsultaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Consulta),
          useFactory: FactoryMock.repositoryMockFactory,
        },
        ConsultaService,
      ],
    }).compile();

    service = module.get<ConsultaService>(ConsultaService);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });
});
