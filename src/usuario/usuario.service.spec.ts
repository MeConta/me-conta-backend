import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { FactoryMock, MockType } from '../testing/factory.mock';
import { FindConditions, Repository, UpdateResult } from 'typeorm';
import { UsuarioStub } from '../testing/usuario.stub';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let repository: MockType<Repository<Usuario>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Usuario),
          useFactory: FactoryMock.repositoryMockFactory,
        },
        UsuarioService,
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    repository = module.get(getRepositoryToken(Usuario));
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('deve retornar uma lista de usuários', async () => {
    jest.spyOn(repository, 'find').mockReturnValue(UsuarioStub.getEntities());

    const response = await service.findAll();

    expect(response).toBeInstanceOf(Array);
  });

  it('deve retornar uma lista de usuários ao utilizar um critério', async () => {
    jest.spyOn(repository, 'find').mockReturnValue(UsuarioStub.getEntities());

    const response = await service.findAll({
      nome: 'teste',
    } as FindConditions<Usuario>);

    expect(response).toBeInstanceOf(Array);
  });

  it('deve encontrar um usuário', async () => {
    jest.spyOn(repository, 'findOne').mockReturnValue(UsuarioStub.getEntity());

    const response = await service.findOne(1);

    expect(response.id).toEqual(UsuarioStub.getEntity().id);
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
    jest.spyOn(repository, 'update').mockReturnValue({
      affected: 1,
    } as UpdateResult);
    jest.spyOn(repository, 'findOne').mockReturnValue(UsuarioStub.getEntity());

    const result = await service.update(1, UsuarioStub.getUpdateDto());
    expect(result.id).toEqual(UsuarioStub.getEntity().id);
  });

  it('Não deve encontrar o usuário para alterar', async () => {
    jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

    await expect(() =>
      service.update(1, UsuarioStub.getUpdateDto()),
    ).rejects.toThrow(NotFoundException);
  });

  it('Não deve alterar o usuário pois os parâmetros estão incorretos', async () => {
    jest.spyOn(repository, 'save').mockImplementation(() => Promise.reject());

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
