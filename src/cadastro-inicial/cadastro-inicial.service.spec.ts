import { FactoryMock, MockType } from '../testing/factory.mock';
import { Repository } from 'typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateCadastroInicialDto } from './dto/create-cadastro-inicial.dto';
import { UsuarioService } from '../usuario/usuario.service';
import { Inject } from '@nestjs/common';
import { CreateUsuarioDto } from '../usuario/dto/create-usuario.dto';

export class CadastroInicialService {
  constructor(
    @Inject(UsuarioService)
    private usuarioService: UsuarioService,
  ) {}

  async create(createDto: CreateCadastroInicialDto) {
    await this.usuarioService.create(<CreateUsuarioDto>{
      email: createDto.email,
      nome: createDto.nome,
      senha: createDto.senha,
      tipoUsuario: createDto.tipoUsuario,
    });
  }
}

describe('CadastroInicialService', () => {
  let service: CadastroInicialService;
  let repository: MockType<Repository<Usuario>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Usuario),
          useFactory: FactoryMock.repositoryMockFactory,
        },
        CadastroInicialService,
      ],
    }).compile();

    service = module.get<CadastroInicialService>(CadastroInicialService);
    repository = module.get(getRepositoryToken(Usuario));
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  // it('deve criar um usuário', async () => {
  //   jest
  //     .spyOn(repository, 'create')
  //     .mockReturnValue(CadastroInicialStub.getEntity());
  //   jest
  //     .spyOn(repository, 'save')
  //     .mockReturnValue(CadastroInicialStub.getEntity());
  //
  //   const response = await service.create(CadastroInicialStub.getCreateDto());
  //
  //   expect(repository.save).toBeCalled();
  //   //expect(response.id).toEqual(CadastroInicialStub.getEntity().id);
  // });
});
