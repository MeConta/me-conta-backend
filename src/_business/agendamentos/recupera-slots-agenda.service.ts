import { SlotAgenda } from './slot-agenda';

export interface RecuperaSlotsAgendaService {
  recuperaSlots(param: {
    inicio: Date;
    fim: Date;
    idAtendente: string;
  }): Promise<SlotAgenda[]>;
}
