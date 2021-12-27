import { createMock } from '@golevelup/ts-jest';
import { Atendimento, NovoAtendimento } from '../entidades/atendimentos.entity';
import { IRealizarNovoAtendimentoService } from '../../../_adapters/atendimentos/services/atendimentos.service';
import {
  ConsultaNaoAconteceuError,
  RealizarAtendimento,
} from './realizar-atendimento.feat';
import { VoluntarioNaoEncontradoError } from '../../admin/casos-de-uso/autorizar-voluntario.feat';
import { IBuscarVoluntarioViaId } from '../../voluntarios/services/voluntario.service';
import {
  AlunoNaoEncontradoError,
  IBuscarAlunoViaId,
} from '../../alunos/casos-de-uso/atualizar-aluno.feat';
import { IDateGreaterThan } from '../../agenda/services/date-time.service';

class InMemoryAtendimentoService implements IRealizarNovoAtendimentoService {
  public atendimentos: Atendimento[] = [];
  realizar(atendimento: NovoAtendimento): Promise<void> {
    this.atendimentos.push({
      ...atendimento,
    });
    return Promise.resolve();
  }
}

describe('Realizar atendimento', () => {
  let sut: RealizarAtendimento;
  let atendimentoService: InMemoryAtendimentoService;
  let voluntarioService: IBuscarVoluntarioViaId;
  let alunoService: IBuscarAlunoViaId;
  let dateService: IDateGreaterThan;
  const request = createMock<NovoAtendimento>();

  beforeEach(async () => {
    atendimentoService = new InMemoryAtendimentoService();
    voluntarioService = createMock<IBuscarVoluntarioViaId>();
    alunoService = createMock<IBuscarAlunoViaId>();
    dateService = createMock<IDateGreaterThan>();
    sut = new RealizarAtendimento(
      atendimentoService,
      voluntarioService,
      alunoService,
      dateService,
    );
  });
  it('Deve ser Definido', () => {
    expect(sut).toBeDefined();
  });

  it('Deve realizar um atendimento', async () => {
    await sut.execute(request);
    expect(atendimentoService.atendimentos[0]).toBeDefined();
  });

  it('Não deve realizar o atendimento se o voluntário não existir', async () => {
    jest.spyOn(voluntarioService, 'findById').mockResolvedValue(null);
    await expect(() => sut.execute(request)).rejects.toThrow(
      VoluntarioNaoEncontradoError,
    );
  });

  it('Não deve realizar o atendimento se o aluno não existir', async () => {
    jest.spyOn(alunoService, 'findById').mockResolvedValue(null);
    await expect(() => sut.execute(request)).rejects.toThrow(
      AlunoNaoEncontradoError,
    );
  });

  it('Não deve realizar o atendimento se a consulta for no futuro', async () => {
    jest.spyOn(dateService, 'greaterThan').mockReturnValue(true);
    await expect(() => sut.execute(request)).rejects.toThrow(
      ConsultaNaoAconteceuError,
    );
  });
});
