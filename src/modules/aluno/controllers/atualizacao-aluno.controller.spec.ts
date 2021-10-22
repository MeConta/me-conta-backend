import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  AlunoNaoEncontradoError,
  AtualizarAluno,
} from '../../../_business/alunos/casos-de-uso/atualizar-aluno.feat';
import { createMock } from '@golevelup/ts-jest';
import { AtualizacaoAlunoController } from './atualizacao-aluno.controller';
import { AtualizarAlunoDto } from '../../../_adapters/alunos/dto/atualizar-aluno.dto';

describe('Atualizar Aluno Controller', () => {
  let controller: AtualizacaoAlunoController;
  const useCase = createMock<AtualizarAluno>();
  beforeEach(async () => {
    controller = new AtualizacaoAlunoController(useCase);
  });

  it('Deve ser definido', async () => {
    expect(controller).toBeDefined();
  });

  it('Deve chamar o caso de uso para atualização do Aluno', async () => {
    await controller.atualizar(
      expect.any(Number),
      expect.any(AtualizarAlunoDto),
    );
    expect(useCase.execute).toBeCalledWith(
      expect.any(Number),
      expect.any(AtualizarAlunoDto),
    );
  });

  it('Deve dar erro de Aluno não encontrado', async () => {
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new AlunoNaoEncontradoError());
    await expect(() =>
      controller.atualizar(expect.any(Number), expect.any(AtualizarAlunoDto)),
    ).rejects.toThrow(NotFoundException);
  });

  it('Deve dar erro genérico', async () => {
    jest.spyOn(useCase, 'execute').mockRejectedValue(new Error());
    await expect(() =>
      controller.atualizar(expect.any(Number), expect.any(AtualizarAlunoDto)),
    ).rejects.toThrow(InternalServerErrorException);
  });
});
