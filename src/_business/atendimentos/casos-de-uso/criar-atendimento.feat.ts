import {
  Atendimento,
  NovoAtendimento,
  StatusAtendimento,
} from '../entidades/atendimentos.entity';
import { INovoAtendimentoService } from '../../../_adapters/atendimentos/services/atendimentos.service';
import {
  AlunoNaoEncontradoError,
  IBuscarAlunoViaId,
} from '../../alunos/casos-de-uso/atualizar-aluno.feat';
import { IDateGreaterThan } from '../../agenda/services/date-time.service';
import { IBuscarSlotAgendaByIdService } from '../../agenda/services/agenda.service';
import { SlotAgendaNaoEncontradoError } from '../../agenda/casos-de-uso/remover-slot-agenda.feat';

export class AtendimentoNaoAconteceuError extends Error {
  code = 422;
  message = 'A data do atendimento está no futuro';
}

export class CriarAtendimento {
  constructor(
    private readonly atendimentoService: INovoAtendimentoService,
    private readonly agendaService: IBuscarSlotAgendaByIdService,
    private readonly alunoService: IBuscarAlunoViaId,
    private readonly dateHelper: IDateGreaterThan,
  ) {}
  async execute(novoAtendimento: NovoAtendimento): Promise<void> {
    const slotAgenda = await this.agendaService.findById(
      (
        await novoAtendimento.slotAgenda
      ).id,
    );
    const aluno = await this.alunoService.findById(
      (
        await novoAtendimento.aluno
      ).id,
    );

    if (!slotAgenda) {
      throw new SlotAgendaNaoEncontradoError();
    }
    if (!aluno) {
      throw new AlunoNaoEncontradoError();
    }
    if (this.dateHelper.greaterThan(novoAtendimento.dataCriacao, new Date())) {
      throw new AtendimentoNaoAconteceuError();
    }

    (novoAtendimento as Atendimento).status = StatusAtendimento.ABERTO;
    await this.atendimentoService.criar(novoAtendimento);
  }
}
