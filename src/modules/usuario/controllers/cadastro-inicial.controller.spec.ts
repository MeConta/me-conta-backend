import { CadastroInicialController } from './cadastro-inicial.controller';
import { Test, TestingModule } from '@nestjs/testing';
import {
  CadastrarNovoUsuario,
  DuplicatedError,
  NoAdminCreationError,
  TipoUsuario,
} from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { createMock } from '@golevelup/ts-jest';
import {
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('Cadastro Inicial', () => {
  let controller: CadastroInicialController;
  let useCase: CadastrarNovoUsuario;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CadastrarNovoUsuario,
          useValue: createMock<CadastrarNovoUsuario>(),
        },
      ],
      controllers: [CadastroInicialController],
    }).compile();
    controller = module.get<CadastroInicialController>(
      CadastroInicialController,
    );
    useCase = module.get<CadastrarNovoUsuario>(CadastrarNovoUsuario);
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
    expect(useCase.execute).toBeCalledWith({
      nome: 'Teste',
      email: 'teste@teste.com',
      tipo: TipoUsuario.ALUNO,
      senha: 's3nh4F0rt3!',
    });
  });

  it('Deve dar erro de usuário duplicado', async () => {
    jest.spyOn(useCase, 'execute').mockRejectedValue(new DuplicatedError());
    await expect(() =>
      controller.cadastrar({
        nome: 'Teste',
        email: 'teste@teste.com',
        tipo: TipoUsuario.ALUNO,
        senha: 's3nh4F0rt3!',
      }),
    ).rejects.toThrow(ConflictException);
  });

  it('Deve dar erro ao tentar cadastrar um administrador', async () => {
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new NoAdminCreationError());
    await expect(() =>
      controller.cadastrar({
        nome: 'Teste',
        email: 'teste@teste.com',
        tipo: TipoUsuario.ADMINISTRADOR,
        senha: 's3nh4F0rt3!',
      }),
    ).rejects.toThrow(ForbiddenException);
  });

  it('Deve dar erro genérico', async () => {
    jest.spyOn(useCase, 'execute').mockRejectedValue(new Error());
    await expect(() =>
      controller.cadastrar({
        nome: 'Teste',
        email: 'teste@teste.com',
        tipo: TipoUsuario.ALUNO,
        senha: 's3nh4F0rt3!',
      }),
    ).rejects.toThrow(InternalServerErrorException);
  });
});
