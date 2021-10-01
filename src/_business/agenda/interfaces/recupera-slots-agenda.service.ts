import { SlotAgenda } from '../entidades/slot-agenda';

export interface RecuperarSlotsParams {
  inicio: Date;
  fim: Date;
  idAtendente: number;
}
export interface RecuperaSlotsAgendaService {
  recuperaSlots(param: RecuperarSlotsParams): Promise<SlotAgenda[]>;
}
