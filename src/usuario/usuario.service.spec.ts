import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { FactoryMock, MockType } from '../testing/factory.mock';
import { Repository } from 'typeorm';
import { UsuarioStub } from '../testing/usuario.stub';

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

  beforeEach(() => {
    repository.find.mockReturnValue(UsuarioStub.getEntities());
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve retornar uma lista de usuarios', async () => {
    const response = await service.findAll();
    expect(response).toBeInstanceOf(Array);
  });

  it('deve retornar um usuario', async () => {
    const response = await service.findOne(1);
    expect(response.id).toEqual(UsuarioStub.getEntity().id);
  });
});
