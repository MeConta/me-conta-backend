import { Test, TestingModule } from '@nestjs/testing';
import { AgendaService } from './agenda.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Agenda } from './entities/agenda.entity';
import { FactoryMock, MockType } from '../testing/factory.mock';
import { Repository } from 'typeorm';

describe('AgendaService', () => {
  let service: AgendaService;
  let repository: MockType<Repository<Agenda>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Agenda),
          useFactory: FactoryMock.repositoryMockFactory,
        },
        AgendaService,
      ],
    }).compile();

    service = module.get<AgendaService>(AgendaService);
    repository = module.get(getRepositoryToken(Agenda));
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });
});
