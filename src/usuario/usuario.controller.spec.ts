import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { FactoryMock } from '../__old/testing/factory.mock';
import { UsuarioStub } from '../__old/testing/usuario.stub';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

describe('UsuarioController', () => {
  let controller: UsuarioController;
  let service: UsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [
        {
          provide: UsuarioService,
          useFactory: FactoryMock.crudServiceMockFactory,
        },
      ],
    }).compile();

    controller = module.get<UsuarioController>(UsuarioController);
    service = module.get<UsuarioService>(UsuarioService);
  });

  it('Deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  it('Deve chamar o serviço de criação do usuário', () => {
    jest.spyOn(service, 'create');
    controller.create(UsuarioStub.getCreateDto());
    expect(service.create).toBeCalled();
  });

  it('Deve chamar o serviço de encontrar os usuários', () => {
    jest.spyOn(service, 'findAll');
    controller.findAll();
    expect(service.findAll).toBeCalled();
  });

  it('Deve chamar o serviço de encontrar os usuários com paginação', () => {
    jest.spyOn(service, 'findAll');
    controller.findAll();
    expect(service.findAll).toBeCalled();
  });

  it('Deve chamar o serviço de encontrar os usuários com padrão ao tentar colocar limit = 0', () => {
    jest.spyOn(service, 'findAll');
    controller.findAll(1, 0);
    expect(service.findAll).toBeCalledWith({
      limit: +process.env.DEFAULT_PAGE_SIZE,
      page: 1,
    } as IPaginationOptions);
  });

  it('Deve chamar o serviço de encontrar os usuários com o máximo ao tentar colocar limit além do máximo', () => {
    jest.spyOn(service, 'findAll');
    controller.findAll(1, Number.MAX_SAFE_INTEGER);
    expect(service.findAll).toBeCalledWith({
      limit: +process.env.MAX_PAGE_SIZE,
      page: 1,
    } as IPaginationOptions);
  });

  it('Deve chamar o serviço de encontrar um usuário', () => {
    jest.spyOn(service, 'findOne');
    controller.findOne(1);
    expect(service.findOne).toBeCalled();
  });

  it('Deve chamar o serviço de alterar um usuário', () => {
    jest.spyOn(service, 'update');
    controller.update(1, UsuarioStub.getUpdateDto());
    expect(service.update).toBeCalled();
  });

  it('Deve chamar o serviço de remover um usuário', () => {
    jest.spyOn(service, 'remove');
    controller.remove(1);
    expect(service.remove).toBeCalled();
  });
});
