import { Test, TestingModule } from '@nestjs/testing';
import { AlunoService } from './aluno.service';
import { AlunoStub } from '../testing/aluno.stub';
import { Aluno } from './entities/aluno.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FactoryMock, MockType } from '../testing/factory.mock';
import { Repository, TypeORMError } from 'typeorm';
import { UnprocessableEntityException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { UsuarioStub } from '../testing/usuario.stub';

describe('AlunoService', () => {
  let service: AlunoService, usuarioService: UsuarioService;
  let repository: MockType<Repository<Aluno>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Aluno),
          useFactory: FactoryMock.repositoryMockFactory,
        },
        {
          provide: UsuarioService,
          useFactory: FactoryMock.serviceMockFactory,
        },
        AlunoService,
      ],
    }).compile();

    service = module.get<AlunoService>(AlunoService);
    usuarioService = module.get<UsuarioService>(UsuarioService);
    repository = module.get(getRepositoryToken(Aluno));
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('Deve criar um aluno', async () => {
    jest.spyOn(repository, 'create').mockReturnValue(AlunoStub.getEntity());
    jest.spyOn(repository, 'save').mockReturnValue(AlunoStub.getEntity());

    const response = await service.create(AlunoStub.getCreateDto());

    expect(response).toBeDefined();
    expect(repository.save).toBeCalled();
    expect(response.id).toEqual(AlunoStub.getEntity().id);
  });

  it('Não deve criar um aluno', async () => {
    jest.spyOn(repository, 'create').mockReturnValue(AlunoStub.getEntity());
    jest
      .spyOn(repository, 'save')
      .mockImplementation(() => Promise.reject(new TypeORMError()));

    await expect(() =>
      service.create(AlunoStub.getCreateDto()),
    ).rejects.toThrow(UnprocessableEntityException);
  });

  it('Deve alterar um aluno', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(AlunoStub.getEntity());
    jest.spyOn(repository, 'save').mockReturnValue(AlunoStub.getEntity());
    jest
      .spyOn(usuarioService, 'findOne')
      .mockResolvedValue(UsuarioStub.getEntity());
    jest
      .spyOn(usuarioService, 'update')
      .mockResolvedValue(UsuarioStub.getEntity());
    const response = await service.update(1, AlunoStub.getUpdateDto());
    expect(response).toBeDefined();
    expect(usuarioService.update).toBeCalled();
    expect(repository.save).toBeCalled();
    expect(response.id).toEqual(AlunoStub.getEntity().id);
  });
});
