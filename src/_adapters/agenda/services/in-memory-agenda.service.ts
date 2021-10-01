import {
  CriarSlotAgendaParams,
  CriarSlotAgendaService,
} from '../../../_business/agenda/interfaces/criar-slot-agenda.service';
import {
  RecuperarSlotsParams,
  RecuperaSlotsAgendaService,
} from '../../../_business/agenda/interfaces/recupera-slots-agenda.service';
import { SlotAgenda } from '../../../_business/agenda/entidades/slot-agenda';

export class InMemoryAgendaService
  implements CriarSlotAgendaService, RecuperaSlotsAgendaService
{
  slots: SlotAgenda[];

  constructor() {
    this.slots = [];
  }

  async criarSlotNovo(param: CriarSlotAgendaParams): Promise<void> {
    this.slots.push({
      id: this.slots.length,
      inicio: param.inicio,
      fim: param.fim,
      idAtendente: param.idAtendente,
    });
  }

  async recuperaSlots(param: RecuperarSlotsParams): Promise<SlotAgenda[]> {
    return this.slots.filter((slot) => {
      return (
        param.idAtendente === slot.idAtendente &&
        (slot.inicio >= param.inicio || slot.fim <= param.fim)
      );
    });
  }
}
