import { Test, TestingModule } from '@nestjs/testing';
import { AgendaService } from './agenda.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Agenda } from './entities/agenda.entity';
import { FactoryMock, MockType } from '../../src/testing/factory.mock';
import { Repository } from 'typeorm';
import { ConsultaService } from '../consulta/consulta.service';
import { AgendaStub } from '../testing/agenda.stub';
import { ConsultaStub } from '../testing/consulta.stub';
import * as PaginateSpy from 'nestjs-typeorm-paginate';

jest.mock('nestjs-typeorm-paginate');

describe('AgendaService', () => {
  let service: AgendaService;
  let repository: MockType<Repository<Agenda>>;
  let consultaService: ConsultaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Agenda),
          useFactory: FactoryMock.repositoryMockFactory,
        },
        {
          provide: ConsultaService,
          useFactory: FactoryMock.crudServiceMockFactory,
        },
        AgendaService,
      ],
    }).compile();

    service = module.get<AgendaService>(AgendaService);
    consultaService = module.get<ConsultaService>(ConsultaService);
    repository = module.get(getRepositoryToken(Agenda));
  });

  beforeEach(() => {
    jest
      .spyOn(PaginateSpy, 'paginate')
      .mockResolvedValue(AgendaStub.getPaginatedEntities());
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('deve retornar agendas com consultas', async () => {
    jest
      .spyOn(consultaService, 'findAll')
      .mockResolvedValue(ConsultaStub.getPaginatedEntities());

    jest.spyOn(repository, 'find').mockResolvedValue(AgendaStub.getEntities());

    const response = await service.findAll();

    expect(response).toBeDefined();
    expect(response.items[0].consulta.id).toBe(ConsultaStub.getEntity().id);
  });

  it('deve retornar uma agenda com consultas', async () => {
    jest
      .spyOn(consultaService, 'findAll')
      .mockResolvedValue(ConsultaStub.getPaginatedEntities());

    jest.spyOn(repository, 'findOne').mockResolvedValue(AgendaStub.getEntity());

    const response = await service.findOne(1);
    expect(response).toBeDefined();
    expect(response.consulta.id).toBe(ConsultaStub.getEntity().id);
  });
});
