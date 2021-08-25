import { IsDate, isInt } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Atendente } from '../../atendente/entities/atendente.entity';
import { IsValidProperty } from '../../pipes';

export class CreateAgendaDto {
  @IsDate()
  @Type(() => Date)
  data: Date;

  @Transform(({ value }) => ({ id: value } as Atendente))
  @IsValidProperty(({ id }) => isInt(id))
  atendente: Atendente;
}
