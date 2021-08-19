import { Test, TestingModule } from '@nestjs/testing';
import { AtendenteService } from './atendente.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Atendente } from './entities/atendente.entity';
import { FactoryMock, MockType } from '../testing/factory.mock';
import { UsuarioService } from '../usuario/usuario.service';
import { FrenteAtuacaoModule } from '../frente-atuacao/frente-atuacao.module';
import { FrenteAtuacaoService } from '../frente-atuacao/frente-atuacao.service';
import { Repository } from 'typeorm';
import { Aluno } from '../aluno/entities/aluno.entity';
import { AtendenteStub } from '../testing/atendente.stub';
import { AlunoStub } from '../testing/aluno.stub';
import { UnprocessableEntityException } from '@nestjs/common';
import { FrenteAtuacaoStub } from '../testing/FrenteAtuacao.stub';

describe('AtendenteService', () => {
  let service: AtendenteService;
  let repository: MockType<Repository<Atendente>>;
  let usuarioService: UsuarioService;
  let frenteAtuacaoService: FrenteAtuacaoService;

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
    repository = module.get(getRepositoryToken(Atendente));
    frenteAtuacaoService =
      module.get<FrenteAtuacaoService>(FrenteAtuacaoService);
    usuarioService = module.get<UsuarioService>(UsuarioService);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  // it('deve criar um atendente', async () => {
  //   jest.spyOn(repository, 'create').mockReturnValue(AtendenteStub.getEntity());
  //   jest.spyOn(repository, 'save').mockReturnValue(AtendenteStub.getEntity());
  //   jest.spyOn(frenteAtuacaoService, 'findAll').mockResolvedValue(FrenteAtuacaoStub.getEntities());
  //
  //   const response = await service.create(AtendenteStub.getCreateDto());
  //
  //   expect(response).toBeDefined();
  //   expect(repository.save).toBeCalled();
  //   expect(response.id).toEqual(AtendenteStub.getEntity().id);
  // });

  it('não deve criar um atendente com frente de atuação inválida', async () => {
    jest.spyOn(repository, 'create').mockReturnValue(AtendenteStub.getEntity());
    jest.spyOn(repository, 'save').mockReturnValue(AtendenteStub.getEntity());
    jest.spyOn(frenteAtuacaoService, 'findAll').mockResolvedValue([]);

    await expect(() =>
      service.create(AtendenteStub.getCreateDto()),
    ).rejects.toThrow(UnprocessableEntityException);
  });
});
