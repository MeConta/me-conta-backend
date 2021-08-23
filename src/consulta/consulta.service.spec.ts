import { Test, TestingModule } from '@nestjs/testing';
import { ConsultaService } from './consulta.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Consulta } from './entities/consulta.entity';
import { FactoryMock } from '../testing/factory.mock';
import {NotFoundException, UnprocessableEntityException} from "@nestjs/common";
import {ConsultaStub} from "../testing/consulta.stub";
import {AlunoService} from "../aluno/aluno.service";
import {AgendaService} from "../agenda/agenda.service";
import {AtendenteService} from "../atendente/atendente.service";

describe('ConsultaService', () => {
  let alunoService: AlunoService;
  let agendaService: AgendaService;
  let atendenteService: AtendenteService;
  let service: ConsultaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Consulta),
          useFactory: FactoryMock.repositoryMockFactory,
        },
        {
          provide: AlunoService,
          useFactory: FactoryMock.crudServiceMockFactory
        },
        {
          provide: AgendaService,
          useFactory: FactoryMock.crudServiceMockFactory
        },
        {
          provide: AtendenteService,
          useFactory: FactoryMock.crudServiceMockFactory
        },
        ConsultaService,
      ],
    }).compile();

    agendaService = module.get<AgendaService>(AgendaService);
    alunoService = module.get<AlunoService>(AlunoService);
    atendenteService = module.get<AtendenteService>(AtendenteService);
    service = module.get<ConsultaService>(ConsultaService);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('Não cadastrar caso o aluno não exista', () => {
    jest
      .spyOn(alunoService, 'findOne')
      .mockRejectedValue(new NotFoundException());
    expect(() => service.create(ConsultaStub.getCreateDto())).rejects.toThrow(
      UnprocessableEntityException,
    );
  });
});
