import { CadastroInicialController } from './cadastro-inicial.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeormUsuarioService } from '../_adapters/usuarios/typeorm-usuario.service';
import { TipoUsuario } from '../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { CadastrarNovoUsuarioService } from '../_business/usuarios/interfaces/cadastrar-novo-usuario.service';

describe('Cadastro Inicial', () => {
  let controller: CadastroInicialController;
  let service: CadastrarNovoUsuarioService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TypeormUsuarioService,
          useValue: {
            cadastrar: jest.fn(),
          },
        },
      ],
      controllers: [CadastroInicialController],
    }).compile();
    controller = module.get<CadastroInicialController>(
      CadastroInicialController,
    );
    service = module.get<CadastrarNovoUsuarioService>(TypeormUsuarioService);
  });
  it('Deve ser definido', async () => {
    expect(controller).toBeDefined();
  });
  it('Deve Cadastrar um usuário', async () => {
    await controller.cadastrar({
      nome: 'Teste',
      email: 'teste@teste.com',
      tipo: TipoUsuario.ALUNO,
      senha: 's3nh4F0rt3!',
    });
    expect(service.cadastrar).toBeCalledWith({
      nome: 'Teste',
      email: 'teste@teste.com',
      tipo: TipoUsuario.ALUNO,
      senha: 's3nh4F0rt3!',
    });
  });
});
