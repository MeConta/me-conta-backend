import { Test, TestingModule } from '@nestjs/testing';
import { SupervisorService } from './supervisor.service';
import { FrenteAtuacaoService } from '../frente-atuacao/frente-atuacao.service';
import { FactoryMock } from '../testing/factory.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Supervisor } from './entities/supervisor.entity';
import { UsuarioService } from '../../usuario/usuario.service';

describe('SupervisorService', () => {
  let service: SupervisorService;

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
