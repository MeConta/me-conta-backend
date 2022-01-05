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
    const r = new Array<Atendimento>(2).fill(createMock<Atendimento>());
    return Promise.resolve(r);
  }
}

describe('Historico atendimentos', () => {
  let sut: HistoricoAtendimento;
  let atendimentoService: InMemoryAtendimentoService;
  let alunoService: IBuscarAlunoViaId;

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

  it('Deve buscar uma lista com 2 atendimento', async () => {
    await expect(await sut.execute(1)).toHaveLength(2);
  });
});
