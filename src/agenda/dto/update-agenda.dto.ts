import { PartialType } from '@nestjs/mapped-types';
import { CreateAgendaDto } from './create-agenda.dto';
import { Transform } from 'class-transformer';
import { Consulta } from '../../consulta/entities/consulta.entity';

export class UpdateAgendaDto extends PartialType(CreateAgendaDto) {
  @Transform(({ value }) => value.id)
  consulta: Consulta;
}
