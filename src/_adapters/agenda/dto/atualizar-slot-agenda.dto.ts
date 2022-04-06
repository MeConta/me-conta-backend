import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

import { AtualizarSlotInput } from '../../../_business/agenda/casos-de-uso/atualizar-slot-agenda.feat';
import { SlotAgendaInputDto } from './create-slot-agenda.dto';

export class AtualizarSlotAgendaDto implements Omit<AtualizarSlotInput, 'id'> {
  @IsNotEmpty({
    message: '$property não deve ser vazio',
  })
  @Type(() => SlotAgendaInputDto)
  slot: SlotAgendaInputDto;
}
