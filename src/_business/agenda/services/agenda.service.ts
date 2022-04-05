import { SlotAgenda } from '../entidades/slot-agenda.entity';

export type SlotAgendaParam = Omit<SlotAgenda, 'id' | 'voluntario'> & {
  voluntarioId: number;
};

export interface CriarSlotAgendaService {
  cadastrar(param: SlotAgendaParam): Promise<void>;
}

export interface RecuperaSlotsAgendaService {
  recuperaSlots(param?: Partial<SlotAgendaParam>): Promise<SlotAgenda[]>;
}

export interface IRemoverSlotAgendaService {
  removerSlot(id: number): Promise<void>;
}

export interface IBuscarSlotAgendaByIdService {
  findById(id: number): Promise<SlotAgenda>;
}

export interface IAtualizaSlotAgendaService {
  atualiza(
    id: number,
    input: Omit<SlotAgendaParam, 'voluntarioId'>,
  ): Promise<SlotAgenda>;
}
