import { SlotAgenda } from '../entidades/slot-agenda.entity';

export type SlotAgendaParam = Omit<SlotAgenda, 'id' | 'voluntario'> & {
  atendenteId: number;
};

export interface CriarSlotAgendaService {
  cadastrar(param: SlotAgendaParam): Promise<void>;
}

export interface RecuperaSlotsAgendaService {
  recuperaSlots(param?: Partial<SlotAgendaParam>): Promise<SlotAgenda[]>;
}
