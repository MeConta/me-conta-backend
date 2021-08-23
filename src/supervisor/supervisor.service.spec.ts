import { Test, TestingModule } from '@nestjs/testing';
import { SupervisorService } from './supervisor.service';
import { FrenteAtuacaoService } from '../frente-atuacao/frente-atuacao.service';
import { FactoryMock, MockType } from '../testing/factory.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Supervisor } from './entities/supervisor.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { Repository } from 'typeorm';

describe('SupervisorService', () => {
  let service: SupervisorService;
  let usuarioService: UsuarioService;
  let frentesAtuacaoService: FrenteAtuacaoService;
  let repository: MockType<Repository<Supervisor>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: FrenteAtuacaoService,
          useFactory: FactoryMock.crudServiceMockFactory,
        },
        {
          provide: UsuarioService,
          useFactory: FactoryMock.crudServiceMockFactory,
        },
        {
          provide: getRepositoryToken(Supervisor),
          useFactory: FactoryMock.repositoryMockFactory,
        },
        SupervisorService,
      ],
    }).compile();

    service = module.get<SupervisorService>(SupervisorService);
    usuarioService = module.get<UsuarioService>(UsuarioService);
    frentesAtuacaoService =
      module.get<FrenteAtuacaoService>(FrenteAtuacaoService);
    repository = module.get(getRepositoryToken(Supervisor));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
