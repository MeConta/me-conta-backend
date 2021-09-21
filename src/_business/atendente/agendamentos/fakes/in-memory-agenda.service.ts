import { CriarSlotAgendaService } from '../interfaces/criar-slot-agenda.service';
import { RecuperaSlotsAgendaService } from '../interfaces/recupera-slots-agenda.service';
import { SlotAgenda } from '../entidades/slot-agenda';

export class InMemoryAgendaService
  implements CriarSlotAgendaService, RecuperaSlotsAgendaService
{
  slots: SlotAgenda[];

  constructor() {
    this.slots = [];
  }

  async criarSlotNovo(param: {
    inicio: Date;
    fim: Date;
    idAtendente: string;
  }): Promise<void> {
    this.slots.push({
      id: this.slots.length,
      inicio: param.inicio,
      fim: param.fim,
      idAtendente: param.idAtendente,
    });
  }

  async recuperaSlots(param: {
    inicio: Date;
    fim: Date;
    idAtendente: string;
  }): Promise<SlotAgenda[]> {
    return this.slots.filter((slot) => {
      return (
        param.idAtendente === slot.idAtendente &&
        (slot.inicio >= param.inicio || slot.fim <= param.fim)
      );
    });
  }
}
