import { VoluntarioNaoEncontradoError } from '../../admin/casos-de-uso/autorizar-voluntario.feat';
import {
  IBuscarSlotAgendaByIdService,
  IRemoverSlotAgendaService,
} from '../services/agenda.service';

export class SlotAgendaNaoEncontradoError extends Error {
  code = 404;
  message = 'Slot de Agenda não encontrado';
}

export class RemoverSlotAgenda {
  constructor(
    private readonly agendaService: IRemoverSlotAgendaService &
      IBuscarSlotAgendaByIdService,
  ) {}

  async execute(id: number) {
    const slot = await this.agendaService.findById(id);
    if (!slot) {
      throw new SlotAgendaNaoEncontradoError();
    }

    const voluntario = await slot.voluntario;

    if (!voluntario.aprovado) {
      throw new VoluntarioNaoEncontradoError();
    }
    return this.agendaService.removerSlot(id);
  }
}
