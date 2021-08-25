import { PartialType } from '@nestjs/mapped-types';
import { CreateAgendaDto } from './create-agenda.dto';
import { Transform } from 'class-transformer';
import { IsValidProperty } from '../../pipes';
import { isInt } from 'class-validator';
import { Consulta } from '../../consulta/entities/consulta.entity';

export class UpdateAgendaDto extends PartialType(CreateAgendaDto) {
  @Transform(({ value }) => value.id)
  @IsValidProperty(({ id }) => isInt(id))
  consulta: Consulta;
}
