import { Test, TestingModule } from '@nestjs/testing';
import { AlunoService } from './aluno.service';
import { AlunoStub } from '../testing/aluno.stub';
import { Aluno } from './entities/aluno.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FactoryMock, MockType } from '../testing/factory.mock';
import { Repository, TypeORMError } from 'typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { UnprocessableEntityException } from '@nestjs/common';

describe('AlunoService', () => {
  let service: AlunoService;
  let repository: MockType<Repository<Aluno>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Aluno),
          useFactory: FactoryMock.repositoryMockFactory,
        },
        AlunoService,
      ],
    }).compile();

    service = module.get<AlunoService>(AlunoService);
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
});
