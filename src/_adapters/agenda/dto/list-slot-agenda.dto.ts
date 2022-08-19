import { SlotAgenda } from '../../../_business/agenda/entidades/slot-agenda.entity';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ListSlotAgendaDto implements Pick<SlotAgenda, 'inicio'> {
  @ApiProperty({
    type: Date,
    required: false,
  })
  @IsNotEmpty({
    message: '$property não deve ser vazio',
  })
  @IsDate({
    message: '$property deve ser uma data',
  })
  @IsOptional()
  @Type(() => Date)
  inicio: Date;
}
