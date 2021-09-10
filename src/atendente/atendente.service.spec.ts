import { Test, TestingModule } from '@nestjs/testing';
import { AtendenteService } from './atendente.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Atendente } from './entities/atendente.entity';
import { FactoryMock, MockType } from '../testing/factory.mock';
import { UsuarioService } from '../usuario/usuario.service';
import { FrenteAtuacaoService } from '../frente-atuacao/frente-atuacao.service';
import { In, Repository } from 'typeorm';
import { AtendenteStub } from '../testing/atendente.stub';
import {
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FrenteAtuacaoStub } from '../testing/frente-atuacao.stub';
import { UsuarioStub } from '../testing/usuario.stub';
import { FrenteAtuacao } from '../frente-atuacao/entities/frente-atuacao.entity';
import { UpdateAtendenteDto } from './dto/update-atendente.dto';
import { SupervisorService } from '../supervisor/supervisor.service';
import { SupervisorStub } from '../testing/supervisor.stub';
import { Supervisor } from '../supervisor/entities/supervisor.entity';
import * as moment from 'moment';

describe('AtendenteService', () => {
  let service: AtendenteService;
  let repository: MockType<Repository<Atendente>>;
  let usuarioService: UsuarioService;
  let supervisorService: SupervisorService;
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
    supervisorService = module.get<SupervisorService>(SupervisorService);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('deve criar um atendente', async () => {
    jest.spyOn(repository, 'create').mockReturnValue(AtendenteStub.getEntity());
    jest.spyOn(repository, 'save').mockReturnValue(AtendenteStub.getEntity());
    jest
      .spyOn(frenteAtuacaoService, 'findAll')
      .mockResolvedValue(FrenteAtuacaoStub.getPaginatedEntities());

    const response = await service.create(AtendenteStub.getCreateDto());

    expect(response).toBeDefined();
    expect(frenteAtuacaoService.findAll).toBeCalledWith(
      {
        page: 1,
        limit: 0,
      },
      {
        where: {
          id: In([1]),
        },
      },
    );
    expect(repository.save).toBeCalled();
    expect(response.id).toEqual(AtendenteStub.getEntity().id);
    expect(usuarioService.create).toBeCalled();
  });

  it('não deve criar um atendente com frente de atuação inexistente', async () => {
    jest.spyOn(repository, 'create').mockReturnValue(AtendenteStub.getEntity());
    jest.spyOn(repository, 'save').mockReturnValue(AtendenteStub.getEntity());
    jest
      .spyOn(frenteAtuacaoService, 'findAll')
      .mockResolvedValue(AtendenteStub.getPaginatedEntities(0));

    await expect(() =>
      service.create(AtendenteStub.getCreateDto()),
    ).rejects.toThrow(UnprocessableEntityException);
  });

  it('não deve criar um atendente com frente de atuação inválidas', async () => {
    jest.spyOn(repository, 'create').mockReturnValue(AtendenteStub.getEntity());
    jest.spyOn(repository, 'save').mockReturnValue(AtendenteStub.getEntity());
    jest
      .spyOn(frenteAtuacaoService, 'findAll')
      .mockResolvedValue(AtendenteStub.getPaginatedEntities(0));

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

  it('não deve criar um atendente com idade inferior a 18 anos', async () => {
    const request = AtendenteStub.getCreateDto();
    jest
      .spyOn(frenteAtuacaoService, 'findAll')
      .mockResolvedValue(FrenteAtuacaoStub.getPaginatedEntities());
    request.dataNascimento = moment().toDate();

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
        .mockResolvedValue(FrenteAtuacaoStub.getPaginatedEntities());
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

    it('Não deve atualizar um atendente pois os parâmetros estão incorretos', async () => {
      jest.spyOn(repository, 'save').mockRejectedValue(new Error());
      await expect(() =>
        service.update(1, AtendenteStub.getUpdateDto()),
      ).rejects.toThrow(UnprocessableEntityException);
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

    it('Deve atualizar o supervisor de um atendente', async () => {
      jest
        .spyOn(supervisorService, 'findOne')
        .mockResolvedValue(SupervisorStub.getEntity());

      request.supervisor = {
        id: 1,
      } as Supervisor;

      const response = await service.update(1, request);

      expect(repository.save).toBeCalled();
      expect(response.id).toBeDefined();
      expect(response.supervisor).toBeDefined();
    });

    it('Deve atualizar o supervisor sem passar Frentes de Atuação', async () => {
      jest
        .spyOn(supervisorService, 'findOne')
        .mockResolvedValue(SupervisorStub.getEntity());

      request.frentesAtuacao = null;

      await service.update(1, request);

      expect(repository.save).toBeCalled();
    });

    it('Deve remover o supervisor de um atendente', async () => {
      request.supervisor = {
        id: null,
      } as Supervisor;

      const response = await service.update(1, request);

      expect(repository.save).toBeCalled();
      expect(response.id).toBeDefined();
      expect(response.supervisor).toBeNull();
    });

    it('Deve forçar semestre como NULO caso formado seja verdadeiro', async () => {
      jest
        .spyOn(frenteAtuacaoService, 'findAll')
        .mockResolvedValue(FrenteAtuacaoStub.getPaginatedEntities(0));

      request = {
        ...request,
        formado: true,
        anoConclusao: 2020,
        crp: 'CRP',
        especializacao: 'teste',
      };

      await service.update(1, request);
      expect(repository.save).toBeCalledWith({
        ...request,
        id: 1,
        semestre: null,
      });
    });

    it('Deve forçar os campos de formação como NULOS caso formado seja falso', async () => {
      jest
        .spyOn(frenteAtuacaoService, 'findAll')
        .mockResolvedValue(FrenteAtuacaoStub.getPaginatedEntities(0));

      request = {
        ...request,
        formado: false,
        semestre: 3,
      };

      await service.update(1, request);
      expect(repository.save).toBeCalledWith({
        ...request,
        id: 1,
        anoConclusao: null,
        crp: null,
        especializacao: null,
      });
    });

    it('Deve dar erro de supervisor não encontrado quando este não existir', async () => {
      jest
        .spyOn(supervisorService, 'findOne')
        .mockRejectedValue(new NotFoundException());

      request.supervisor = {
        id: 1,
      } as Supervisor;

      await expect(() => service.update(1, request)).rejects.toThrow(
        UnprocessableEntityException,
      );
    });
  });
});
