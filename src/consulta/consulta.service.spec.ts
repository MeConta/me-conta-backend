import { Test, TestingModule } from '@nestjs/testing';
import { ConsultaService } from './consulta.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Consulta } from './entities/consulta.entity';
import { FactoryMock, MockType } from '../testing/factory.mock';
import { ConsultaStub } from '../testing/consulta.stub';
import { AgendaService } from '../agenda/agenda.service';
import { Repository } from 'typeorm';
import { UnprocessableEntityException } from '@nestjs/common';
import { AgendaStub } from '../testing/agenda.stub';

describe('ConsultaService', () => {
  let agendaService: AgendaService;
  let service: ConsultaService;
  let repository: MockType<Repository<Consulta>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Consulta),
          useFactory: FactoryMock.repositoryMockFactory,
        },
        {
          provide: AgendaService,
          useFactory: FactoryMock.crudServiceMockFactory,
        },
        ConsultaService,
      ],
    }).compile();

    repository = module.get(getRepositoryToken(Consulta));
    agendaService = module.get<AgendaService>(AgendaService);
    service = module.get<ConsultaService>(ConsultaService);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('Não cadastrar caso algum dos dados não exista', async () => {
    jest.spyOn(repository, 'save').mockRejectedValue({
      table: 'mock',
      column: 'mock',
    });

    try {
      await service.create(ConsultaStub.getCreateDto());
    } catch (err) {
      expect(err.response.details).toBeDefined();
      expect(err.response.details.table).toBe('mock');
      expect(err.response.details.column).toBe('mock');
    }
  });

  it('Não deve cadastrar duas consultas em uma mesma agenda', async () => {
    const agenda = AgendaStub.getEntity();
    agenda.consulta = ConsultaStub.getEntity();
    jest.spyOn(agendaService, 'findOne').mockResolvedValue(agenda);

    const request = ConsultaStub.getCreateDto();

    await expect(() => service.create(request)).rejects.toThrow(
      UnprocessableEntityException,
    );
  });
});
