import { createMock } from '@golevelup/ts-jest';
import {
  AtendimentoNaoEncontradoError,
  AtualizarAtendimento,
} from '../../../_business/atendimentos/casos-de-uso/atualizar-atendimento.feat';
import { AtualizarAtendimentoController } from './atualizar-atendimento.controller';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('Atualizar Atendimento Controller', () => {
  let controller: AtualizarAtendimentoController;
  const atualizarAtendimentoMock = createMock<AtualizarAtendimento>();
  beforeEach(async () => {
    controller = new AtualizarAtendimentoController(atualizarAtendimentoMock);
  });

  it('Deve ser definido', async () => {
    expect(controller).toBeDefined();
  });

  it('Deve retornar o erro de atendimento não encontrado', async () => {
    jest
      .spyOn(atualizarAtendimentoMock, 'execute')
      .mockRejectedValue(new AtendimentoNaoEncontradoError());
    await expect(controller.atualizar(1, { status: 1 })).rejects.toThrow(
      NotFoundException,
    );
  });

  it('Deve retornar o erro 500 generico', async () => {
    jest
      .spyOn(atualizarAtendimentoMock, 'execute')
      .mockRejectedValue(new Error());
    await expect(controller.atualizar(1, { status: 1 })).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
