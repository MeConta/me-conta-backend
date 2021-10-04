import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from '../../src/_business/usuarios/entidades/usuario.entity';
import { FactoryMock, MockType } from '../../src/testing/factory.mock';
import { FindConditions, Repository } from 'typeorm';
import { UsuarioStub } from '../../src/testing/usuario.stub';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as PaginateSpy from 'nestjs-typeorm-paginate';
import * as bcrypt from 'bcrypt';
import { UsuarioDbEntity } from '../../src/_adapters/usuarios/entidades/usuario.db.entity';

jest.mock('nestjs-typeorm-paginate');

describe('UsuarioService', () => {
  let service: UsuarioService;
  let repository: MockType<Repository<Usuario>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(UsuarioDbEntity),
          useFactory: FactoryMock.repositoryMockFactory,
        },
        UsuarioService,
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    repository = module.get(getRepositoryToken(UsuarioDbEntity));
  });

  beforeEach(() => {
    jest
      .spyOn(PaginateSpy, 'paginate')
      .mockResolvedValue(UsuarioStub.getPaginatedEntities());
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('deve retornar uma lista de usuários', async () => {
    const entities = UsuarioStub.getEntities();
    const response = await service.findAll();

    expect(PaginateSpy.paginate).toBeCalled();
    expect(response.items).toStrictEqual(entities);
  });

  it('deve retornar uma lista de usuários ao utilizar um critério', async () => {
    jest.spyOn(repository, 'find').mockReturnValue(UsuarioStub.getEntities());

    const response = await service.findAll(
      {
        page: 1,
        limit: 10,
      },
      {
        nome: 'teste',
      } as FindConditions<Usuario>,
    );

    expect(response.items).toBeDefined();
    expect(response.items).toStrictEqual(UsuarioStub.getEntities());
  });

  it('deve encontrar um usuário', async () => {
    jest.spyOn(repository, 'findOne').mockReturnValue(UsuarioStub.getEntity());

    const response = await service.findOne(1);

    expect(response.id).toEqual(UsuarioStub.getEntity().id);
  });

  it('deve encontrar um usuário via e-mail', async () => {
    jest.spyOn(repository, 'findOne').mockReturnValue(UsuarioStub.getEntity());

    const response = await service.findOneByEmail('teste@teste.com');

    expect(response).toBeDefined();
  });

  it('não deve retornar um usuário', async () => {
    jest.spyOn(repository, 'findOne').mockReturnValue(undefined);

    await expect(() => service.findOne(1)).rejects.toThrow(NotFoundException);
  });

  it('deve criar  um usuário', async () => {
    jest.spyOn(repository, 'create').mockReturnValue(UsuarioStub.getEntity());
    jest.spyOn(repository, 'save').mockReturnValue(UsuarioStub.getEntity());

    const response = await service.create(UsuarioStub.getCreateDto());

    expect(response.id).toEqual(UsuarioStub.getEntity().id);
    expect(repository.save).toBeCalled();
  });

  it('não deve criar  um usuário', async () => {
    jest.spyOn(repository, 'create').mockReturnValue(UsuarioStub.getEntity());
    jest.spyOn(repository, 'save').mockImplementation(() => Promise.reject());

    await expect(() =>
      service.create(UsuarioStub.getCreateDto()),
    ).rejects.toThrow(UnprocessableEntityException);
  });

  it('deve atualizar um usuário', async () => {
    jest.spyOn(repository, 'save').mockReturnValue(UsuarioStub.getEntity());
    jest.spyOn(repository, 'findOne').mockReturnValue(UsuarioStub.getEntity());

    const result = await service.update(1, UsuarioStub.getUpdateDto());
    expect(result.id).toEqual(UsuarioStub.getEntity().id);
  });

  it('Deve atualizar a senha de um usuário', async () => {
    const entity = UsuarioStub.getEntity();
    jest.spyOn(repository, 'save').mockReturnValue(entity);
    jest.spyOn(repository, 'findOne').mockReturnValue(entity);

    const SENHA = 'outraS3nh@';
    const request = { ...UsuarioStub.getUpdateDto(), senha: SENHA };

    await service.update(1, request);
    expect(repository.save).toBeCalledWith({
      ...request,
      id: 1,
      senha: await bcrypt.hash(SENHA, entity.salt),
    });
  });

  it('Não deve encontrar o usuário para alterar', async () => {
    jest.spyOn(repository, 'findOne').mockReturnValue(null);

    await expect(() =>
      service.update(1, UsuarioStub.getUpdateDto()),
    ).rejects.toThrow(NotFoundException);
  });

  it('Não deve alterar o usuário pois os parâmetros estão incorretos', async () => {
    jest.spyOn(repository, 'findOne').mockReturnValue(UsuarioStub.getEntity());
    // jest.spyOn(repository, 'save').mockImplementation(() => Promise.reject());
    jest.spyOn(repository, 'save').mockRejectedValue(new Error());

    await expect(() =>
      service.update(1, UsuarioStub.getUpdateDto()),
    ).rejects.toThrow(UnprocessableEntityException);
  });

  it('Deve remover um usuário', async () => {
    jest
      .spyOn(repository, 'softRemove')
      .mockReturnValue(UsuarioStub.getEntities());

    jest.spyOn(service, 'findOne').mockResolvedValue(UsuarioStub.getEntity());

    const result = await service.remove(1);

    expect(result).toBeDefined();
  });
});