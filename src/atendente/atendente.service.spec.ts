import { Test, TestingModule } from '@nestjs/testing';
import { AtendenteService } from './atendente.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Atendente } from './entities/atendente.entity';
import { FactoryMock } from '../testing/factory.mock';
import { UsuarioService } from '../usuario/usuario.service';
import { FrenteAtuacaoModule } from '../frente-atuacao/frente-atuacao.module';
import { FrenteAtuacaoService } from '../frente-atuacao/frente-atuacao.service';

describe('AtendenteService', () => {
  let service: AtendenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Atendente),
          useFactory: FactoryMock.repositoryMockFactory,
        },
        {
          provide: UsuarioService,
          useFactory: FactoryMock.serviceMockFactory,
        },
        {
          provide: FrenteAtuacaoService,
          useFactory: FactoryMock.serviceMockFactory,
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
