import { SlotAgenda } from '../entidades/slot-agenda';

export interface RecuperaSlotsAgendaService {
  recuperaSlots(param: {
    inicio: Date;
    fim: Date;
    idAtendente: number;
  }): Promise<SlotAgenda[]>;
}
