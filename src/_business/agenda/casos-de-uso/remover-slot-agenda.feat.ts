import { VoluntarioNaoEncontradoError } from '../../admin/casos-de-uso/autorizar-voluntario.feat';
import {
  IBuscarSlotAgendaByIdService,
  IRemoverSlotAgendaService,
} from '../services/agenda.service';
import { IDateGreaterThan } from '../services/date-time.service';

export class SlotAgendaNaoEncontradoError extends Error {
  code = 404;
  message = 'Slot de Agenda não encontrado';
}
export class SlotNaoPertenceAoVoluntarioError extends Error {
  code = 403;
  message = 'Slot de Agenda não pertence ao voluntário';
}

export class SlotNoPassadoError extends Error {
  code = 422;
  message = 'Slot de agenda no passado';
}

export class RemoverSlotAgenda {
  constructor(
    private readonly agendaService: IRemoverSlotAgendaService &
      IBuscarSlotAgendaByIdService,
    private readonly dateHelper: IDateGreaterThan,
  ) {}

  async execute(id: number, voluntarioId: number) {
    const slot = await this.agendaService.findById(id);
    if (!slot) {
      throw new SlotAgendaNaoEncontradoError();
    }

    if (this.dateHelper.greaterThan(new Date(), slot.inicio)) {
      throw new SlotNoPassadoError();
    }

    const voluntario = await slot.voluntario;

    if (!voluntario.aprovado) {
      throw new VoluntarioNaoEncontradoError();
    }
    if (voluntario.id !== voluntarioId) {
      throw new SlotNaoPertenceAoVoluntarioError();
    }
    return this.agendaService.removerSlot(id);
  }
}
