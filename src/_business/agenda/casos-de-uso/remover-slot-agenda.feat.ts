import { VoluntarioNaoEncontradoError } from '../../admin/casos-de-uso/autorizar-voluntario.feat';
import {
  IBuscarSlotAgendaByIdService,
  IRemoverSlotAgendaService,
} from '../services/agenda.service';

export class SlotAgendaNaoEncontradoError extends Error {
  code = 404;
  message = 'Slot de Agenda não encontrado';
}
export class SlotNaoPertenceAoVoluntario extends Error {
  code = 403;
  message = 'Slot de Agenda não pertence ao voluntário';
}

export class RemoverSlotAgenda {
  constructor(
    private readonly agendaService: IRemoverSlotAgendaService &
      IBuscarSlotAgendaByIdService,
  ) {}

  async execute(id: number, voluntarioId: number) {
    const slot = await this.agendaService.findById(id);
    if (!slot) {
      throw new SlotAgendaNaoEncontradoError();
    }

    const voluntario = await slot.voluntario;

    if (!voluntario.aprovado) {
      throw new VoluntarioNaoEncontradoError();
    }
    if (voluntario.id !== voluntarioId) {
      throw new SlotNaoPertenceAoVoluntario();
    }
    return this.agendaService.removerSlot(id);
  }
}
