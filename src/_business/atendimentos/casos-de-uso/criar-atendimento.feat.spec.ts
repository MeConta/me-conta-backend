import { createMock } from '@golevelup/ts-jest';
import {
  NovoAtendimento,
  StatusAtendimento,
} from '../entidades/atendimentos.entity';
import { INovoAtendimentoService } from '../../../_adapters/atendimentos/services/atendimentos.service';
import {
  AtendimentoNaoAconteceuError,
  CriarAtendimento,
} from './criar-atendimento.feat';
import {
  AlunoNaoEncontradoError,
  IBuscarAlunoViaId,
} from '../../alunos/casos-de-uso/atualizar-aluno.feat';
import { IDateGreaterThan } from '../../agenda/services/date-time.service';
import { IBuscarSlotAgendaByIdService } from '../../agenda/services/agenda.service';
import { SlotAgendaNaoEncontradoError } from '../../agenda/casos-de-uso/remover-slot-agenda.feat';

class InMemoryAtendimentoService implements INovoAtendimentoService {
  public atendimentos: NovoAtendimento[] = [];
  criar(atendimento: NovoAtendimento): Promise<void> {
    this.atendimentos.push({
      ...atendimento,
    });
    return Promise.resolve();
  }
}

describe('Criar atendimento', () => {
  let sut: CriarAtendimento;
  let atendimentoService: InMemoryAtendimentoService;
  let agendaService: IBuscarSlotAgendaByIdService;
  let alunoService: IBuscarAlunoViaId;
  let dateService: IDateGreaterThan;
  const novoAtendimento = createMock<NovoAtendimento>();

  beforeEach(async () => {
    atendimentoService = new InMemoryAtendimentoService();
    agendaService = createMock<IBuscarSlotAgendaByIdService>();
    alunoService = createMock<IBuscarAlunoViaId>();
    dateService = createMock<IDateGreaterThan>();
    sut = new CriarAtendimento(
      atendimentoService,
      agendaService,
      alunoService,
      dateService,
    );
  });
  it('Deve ser Definido', () => {
    expect(sut).toBeDefined();
  });

  it('Deve criar um atendimento', async () => {
    jest.spyOn(dateService, 'greaterThan').mockReturnValue(false);
    await sut.execute(novoAtendimento);
    expect(atendimentoService.atendimentos[0]).toBeDefined();
  });

  it('Deve adicionar status EM ABERTO ao atendimento', async () => {
    jest.spyOn(dateService, 'greaterThan').mockReturnValue(false);
    await sut.execute(novoAtendimento);
    expect(atendimentoService.atendimentos[0]).toHaveProperty(
      'status',
      StatusAtendimento.ABERTO,
    );
  });

  it('Não deve criar o atendimento se a agenda não existir', async () => {
    jest.spyOn(agendaService, 'findById').mockResolvedValue(null);
    await expect(() => sut.execute(novoAtendimento)).rejects.toThrow(
      SlotAgendaNaoEncontradoError,
    );
  });

  it('Não deve criar o atendimento se o aluno não existir', async () => {
    jest.spyOn(alunoService, 'findById').mockResolvedValue(null);
    await expect(() => sut.execute(novoAtendimento)).rejects.toThrow(
      AlunoNaoEncontradoError,
    );
  });

  it('Não deve criar o atendimento se a consulta for no futuro', async () => {
    jest.spyOn(dateService, 'greaterThan').mockReturnValue(true);
    await expect(() => sut.execute(novoAtendimento)).rejects.toThrow(
      AtendimentoNaoAconteceuError,
    );
  });
});
