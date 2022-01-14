import { createMock } from '@golevelup/ts-jest';
import { CriarAtendimentoController } from './criar-atendimento.controller';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  AtendimentoNaoAconteceuError,
  CriarAtendimento,
} from '../../../_business/atendimentos/casos-de-uso/criar-atendimento.feat';
import { CreateAtendimentoDto } from '../../../_adapters/atendimentos/dto/create-atendimento.dto';
import { AlunoNaoEncontradoError } from '../../../_business/alunos/casos-de-uso/atualizar-aluno.feat';
import { SlotAgendaNaoEncontradoError } from '../../../_business/agenda/casos-de-uso/remover-slot-agenda.feat';

describe('Criar Atendimento Controller', () => {
  let controller: CriarAtendimentoController;
  const criarAtendimento = createMock<CriarAtendimento>();
  beforeEach(async () => {
    controller = new CriarAtendimentoController(criarAtendimento);
  });

  it('Deve ser definido', async () => {
    expect(controller).toBeDefined();
  });

  it('Deve chamar o caso de uso para criar o atendimento', async () => {
    await controller.criar(expect.any(criarAtendimento));
    expect(criarAtendimento.execute).toBeCalledWith(
      expect.any(CreateAtendimentoDto),
    );
  });

  it('Deve dar erro de Voluntário não encontrado', async () => {
    jest
      .spyOn(criarAtendimento, 'execute')
      .mockRejectedValue(new SlotAgendaNaoEncontradoError());
    await expect(() =>
      controller.criar(expect.any(CreateAtendimentoDto)),
    ).rejects.toThrow(NotFoundException);
  });

  it('Deve dar erro de Aluno não encontrado', async () => {
    jest
      .spyOn(criarAtendimento, 'execute')
      .mockRejectedValue(new AlunoNaoEncontradoError());
    await expect(() =>
      controller.criar(expect.any(CreateAtendimentoDto)),
    ).rejects.toThrow(NotFoundException);
  });

  it('Deve dar erro de consulta não aconteceu', async () => {
    jest
      .spyOn(criarAtendimento, 'execute')
      .mockRejectedValue(new AtendimentoNaoAconteceuError());
    await expect(() =>
      controller.criar(expect.any(CreateAtendimentoDto)),
    ).rejects.toThrow(InternalServerErrorException);
  });

  it('Deve dar erro genérico', async () => {
    jest.spyOn(criarAtendimento, 'execute').mockRejectedValue(new Error());
    await expect(() =>
      controller.criar(expect.any(CreateAtendimentoDto)),
    ).rejects.toThrow(InternalServerErrorException);
  });
});
