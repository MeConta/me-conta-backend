import { createMock } from '@golevelup/ts-jest';
import { Atendimento } from '../entidades/atendimentos.entity';
import { HistoricoAtendimento } from './historico-atendimento.feat';
import {
  AlunoNaoEncontradoError,
  IBuscarAlunoViaId,
} from '../../alunos/casos-de-uso/atualizar-aluno.feat';
import { IHistoricoAtendimentoService } from '../../../_adapters/atendimentos/services/atendimentos.service';

class InMemoryAtendimentoService implements IHistoricoAtendimentoService {
  consultar(alunoId: number): Promise<Atendimento[]> {
    return Promise.resolve([]);
  }
}

describe('Historico atendimentos', () => {
  let sut: HistoricoAtendimento;
  let atendimentoService: InMemoryAtendimentoService;
  let alunoService: IBuscarAlunoViaId;
  const request = createMock<Atendimento[]>();

  beforeEach(async () => {
    atendimentoService = new InMemoryAtendimentoService();
    alunoService = createMock<IBuscarAlunoViaId>();
    sut = new HistoricoAtendimento(alunoService, atendimentoService);
  });

  it('Deve ser Definido', () => {
    expect(sut).toBeDefined();
  });

  it('Não deve buscar o histórico se o aluno não existir', async () => {
    jest.spyOn(alunoService, 'findById').mockResolvedValue(null);
    await expect(() => sut.execute(1)).rejects.toThrow(AlunoNaoEncontradoError);
  });
});
