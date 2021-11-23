import { CriarSlotInput } from '../../../_business/agenda/casos-de-uso/criar-novo-slot-de-agenda.feat';
import { SlotAgenda } from '../../../_business/agenda/entidades/slot-agenda.entity';
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SlotAgendaInputDto implements Pick<SlotAgenda, 'inicio'> {
  @IsNotEmpty({
    message: '$property não deve ser vazio',
  })
  @IsDate({
    message: '$property deve ser uma data',
  })
  @Type(() => Date)
  inicio: Date;
}

export class CreateSlotAgendaDto
  implements Omit<CriarSlotInput, 'voluntarioId'>
{
  @IsArray({
    message: '$property deve ser um array',
  })
  @IsNotEmpty({
    message: '$property não deve ser vazio',
  })
  @ArrayMinSize(1, {
    message: '$property deve ter ao menos 1 elemento(s)',
  })
  @ValidateNested({
    message: '$property deve ser um array contendo as propriedades de um slot',
    each: true,
  })
  @Type(() => SlotAgendaInputDto)
  slots: SlotAgendaInputDto[];
}
