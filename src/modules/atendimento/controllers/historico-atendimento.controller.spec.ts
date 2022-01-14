import { createMock } from '@golevelup/ts-jest';

import { HistoricoAtendimento } from '../../../_business/atendimentos/casos-de-uso/historico-atendimento.feat';
import { HistoricoAtendimentoController } from './historico-atendimento.controller';
import { AlunoNaoEncontradoError } from '../../../_business/alunos/casos-de-uso/atualizar-aluno.feat';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ITokenUser } from '../../../_business/auth/interfaces/auth';

describe('Histórico de Atendimento Controller', () => {
  let controller: HistoricoAtendimentoController;
  const historicoAtendimento = createMock<HistoricoAtendimento>();
  beforeEach(async () => {
    controller = new HistoricoAtendimentoController(historicoAtendimento);
  });

  it('Deve ser definido', async () => {
    expect(controller).toBeDefined();
  });

  it('Deve chamar o caso de uso para mostrar o historico de atendimento', async () => {
    await controller.historico({ id: 1 });
    expect(historicoAtendimento.execute).toBeCalledWith(1);
  });

  it('Deve dar erro de Aluno não encontrado', async () => {
    jest
      .spyOn(historicoAtendimento, 'execute')
      .mockRejectedValue(new AlunoNaoEncontradoError());
    await expect(() => controller.historico(expect.anything())).rejects.toThrow(
      NotFoundException,
    );
  });

  it('Deve dar erro genérico', async () => {
    jest.spyOn(historicoAtendimento, 'execute').mockRejectedValue(new Error());
    await expect(() =>
      controller.historico(createMock<Pick<ITokenUser, 'id'>>()),
    ).rejects.toThrow(InternalServerErrorException);
  });
});
