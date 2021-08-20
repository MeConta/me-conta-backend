import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { FactoryMock } from '../testing/factory.mock';
import { UsuarioStub } from '../testing/usuario.stub';

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

  it('Deve chamar o serviço de encontrar um usuário', () => {
    jest.spyOn(service, 'findOne');
    controller.findOne('1');
    expect(service.findOne).toBeCalled();
  });

  it('Deve chamar o serviço de alterar um usuário', () => {
    jest.spyOn(service, 'update');
    controller.update('1', UsuarioStub.getUpdateDto());
    expect(service.update).toBeCalled();
  });

  it('Deve chamar o serviço de remover um usuário', () => {
    jest.spyOn(service, 'remove');
    controller.remove('1');
    expect(service.remove).toBeCalled();
  });
});
