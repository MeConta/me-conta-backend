import { FactoryMock, MockType } from '../testing/factory.mock';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeormUsuarioService } from '../_adapters/usuarios/typeorm-usuario.service';
import { UsuarioDbEntity } from '../_adapters/usuarios/entidades/usuario.db.entity';

/*export class CadastroInicialService {
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
}*/

describe('CadastroInicialService', () => {
  let service: TypeormUsuarioService;
  let repository: MockType<Repository<UsuarioDbEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(UsuarioDbEntity),
          useFactory: FactoryMock.repositoryMockFactory,
        },
        TypeormUsuarioService,
      ],
    }).compile();

    service = module.get<TypeormUsuarioService>(TypeormUsuarioService);
    repository = module.get(getRepositoryToken(UsuarioDbEntity));
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
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
