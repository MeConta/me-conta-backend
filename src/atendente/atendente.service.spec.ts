import { Test, TestingModule } from '@nestjs/testing';
import { AtendenteService } from './atendente.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Atendente } from './entities/atendente.entity';
import { FactoryMock, MockType } from '../testing/factory.mock';
import { UsuarioService } from '../usuario/usuario.service';
import { FrenteAtuacaoService } from '../frente-atuacao/frente-atuacao.service';
import { Repository } from 'typeorm';
import { AtendenteStub } from '../testing/atendente.stub';
import {
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FrenteAtuacaoStub } from '../testing/FrenteAtuacao.stub';
import { UsuarioStub } from '../testing/usuario.stub';
import { FrenteAtuacao } from '../frente-atuacao/entities/frente-atuacao.entity';
import { UpdateAtendenteDto } from './dto/update-atendente.dto';
import { SupervisorService } from '../supervisor/supervisor.service';

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
          useFactory: FactoryMock.crudServiceMockFactory,
        },
        {
          provide: FrenteAtuacaoService,
          useFactory: FactoryMock.crudServiceMockFactory,
        },
        {
          provide: SupervisorService,
          useFactory: FactoryMock.crudServiceMockFactory,
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

  it('deve criar um atendente', async () => {
    jest.spyOn(repository, 'create').mockReturnValue(AtendenteStub.getEntity());
    jest.spyOn(repository, 'save').mockReturnValue(AtendenteStub.getEntity());
    jest
      .spyOn(frenteAtuacaoService, 'findAll')
      .mockResolvedValue(FrenteAtuacaoStub.getEntities());

    const response = await service.create(AtendenteStub.getCreateDto());

    expect(response).toBeDefined();
    expect(repository.save).toBeCalled();
    expect(response.id).toEqual(AtendenteStub.getEntity().id);
    expect(usuarioService.create).toBeCalled();
  });

  it('não deve criar um atendente com frente de atuação inexistente', async () => {
    jest.spyOn(repository, 'create').mockReturnValue(AtendenteStub.getEntity());
    jest.spyOn(repository, 'save').mockReturnValue(AtendenteStub.getEntity());
    jest.spyOn(frenteAtuacaoService, 'findAll').mockResolvedValue([]);

    await expect(() =>
      service.create(AtendenteStub.getCreateDto()),
    ).rejects.toThrow(UnprocessableEntityException);
  });

  it('não deve criar um atendente com frente de atuação inválidas', async () => {
    jest.spyOn(repository, 'create').mockReturnValue(AtendenteStub.getEntity());
    jest.spyOn(repository, 'save').mockReturnValue(AtendenteStub.getEntity());
    jest.spyOn(frenteAtuacaoService, 'findAll').mockResolvedValue([]);

    const request = AtendenteStub.getCreateDto();
    request.frentesAtuacao[0].id = NaN;

    await expect(() => service.create(request)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('não deve criar um atendente com frente de atuação inexistente', async () => {
    jest.spyOn(repository, 'create').mockReturnValue(AtendenteStub.getEntity());
    jest.spyOn(repository, 'save').mockReturnValue(AtendenteStub.getEntity());
    jest.spyOn(frenteAtuacaoService, 'findAll').mockRejectedValue(null);

    const request = AtendenteStub.getCreateDto();

    await expect(() => service.create(request)).rejects.toThrow(
      UnprocessableEntityException,
    );
  });

  describe('Atualização de atendente', () => {
    let request: UpdateAtendenteDto;

    beforeEach(() => {
      jest
        .spyOn(repository, 'create')
        .mockReturnValue(AtendenteStub.getEntity());
      jest.spyOn(repository, 'save').mockReturnValue(AtendenteStub.getEntity());
      jest
        .spyOn(repository, 'findOne')
        .mockReturnValue(AtendenteStub.getEntity());
      jest
        .spyOn(frenteAtuacaoService, 'findAll')
        .mockResolvedValue(FrenteAtuacaoStub.getEntities());
      jest
        .spyOn(usuarioService, 'findOne')
        .mockResolvedValue(UsuarioStub.getEntity());

      request = AtendenteStub.getUpdateDto();
    });

    it('Deve atualizar um atendente', async () => {
      const response = await service.update(1, request);
      expect(response.id).toBeDefined();
      expect(repository.save).toBeCalled();
    });

    it('Deve atualizar a frente de Atuação de um atendente', async () => {
      request.frentesAtuacao = [
        {
          id: 1,
        } as FrenteAtuacao,
      ];
      const response = await service.update(1, request);
      expect(response.id).toBeDefined();
      expect(repository.save).toBeCalled();
    });
  });
});
