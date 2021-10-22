import { Test, TestingModule } from '@nestjs/testing';
import {
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CadastrarAluno } from '../../_business/alunos/casos-de-uso/cadastrar-aluno.feat';
import { createMock } from '@golevelup/ts-jest';
import {
  UsuarioInvalidoError,
  UsuarioNaoEncontradoError,
} from '../../_business/usuarios/erros/erros';
import { Usuario } from '../../_business/usuarios/entidades/usuario.entity';
import { CreateAlunoDto } from '../../_adapters/alunos/dto/create-aluno.dto';
import { CadastroAlunoController } from './cadastro-aluno.controller';

describe('Cadastro-aluno', function () {
  let controller: CadastroAlunoController;
  let useCase: CadastrarAluno;

  const request = createMock<CreateAlunoDto>();
  const user = createMock<Usuario>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CadastrarAluno,
          useValue: createMock<CadastrarAluno>(),
        },
      ],
      controllers: [CadastroAlunoController],
    }).compile();
    controller = module.get<CadastroAlunoController>(CadastroAlunoController);
    useCase = module.get<CadastrarAluno>(CadastrarAluno);
  });
  it('deve ser definido', async () => {
    expect(controller).toBeDefined();
  });
  it('Deve cadastrar um aluno', async () => {
    await controller.cadastrar(request, user);
    expect(useCase.execute).toBeCalled();
  });
  it('Deve dar erro de usuário do aluno não encontrado', async () => {
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new UsuarioNaoEncontradoError());
    await expect(() => controller.cadastrar(request, user)).rejects.toThrow(
      NotFoundException,
    );
  });
  it('Deve dar erro de tipo de usuário inválido', async () => {
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new UsuarioInvalidoError());
    await expect(() => controller.cadastrar(request, user)).rejects.toThrow(
      UnprocessableEntityException,
    );
  });
  it('Deve dar erro genérico', async () => {
    jest.spyOn(useCase, 'execute').mockRejectedValue(new Error());
    await expect(() => controller.cadastrar(request, user)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
