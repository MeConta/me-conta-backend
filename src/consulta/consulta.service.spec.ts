import { Test, TestingModule } from '@nestjs/testing';
import { ConsultaService } from './consulta.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Consulta } from './entities/consulta.entity';
import { FactoryMock, MockType } from '../testing/factory.mock';
import { ConsultaStub } from '../testing/consulta.stub';
import { AlunoService } from '../aluno/aluno.service';
import { AgendaService } from '../agenda/agenda.service';
import { AtendenteService } from '../atendente/atendente.service';
import { Repository } from 'typeorm';

describe('ConsultaService', () => {
  let alunoService: AlunoService;
  let agendaService: AgendaService;
  let atendenteService: AtendenteService;
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
          provide: AlunoService,
          useFactory: FactoryMock.crudServiceMockFactory,
        },
        {
          provide: AgendaService,
          useFactory: FactoryMock.crudServiceMockFactory,
        },
        {
          provide: AtendenteService,
          useFactory: FactoryMock.crudServiceMockFactory,
        },
        ConsultaService,
      ],
    }).compile();

    repository = module.get(getRepositoryToken(Consulta));
    agendaService = module.get<AgendaService>(AgendaService);
    alunoService = module.get<AlunoService>(AlunoService);
    atendenteService = module.get<AtendenteService>(AtendenteService);
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
});
