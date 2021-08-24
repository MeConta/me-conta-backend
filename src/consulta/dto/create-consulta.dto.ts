import { Transform } from 'class-transformer';
import { Atendente } from '../../atendente/entities/atendente.entity';
import { Aluno } from '../../aluno/entities/aluno.entity';
import { Agenda } from '../../agenda/entities/agenda.entity';
import { isInt } from 'class-validator';
import { IsValidProperty } from '../../pipes';

export class CreateConsultaDto {
  @IsValidProperty(({ id }) => isInt(id))
  @Transform(({ value }) => ({ id: value } as Atendente))
  atendente: Atendente;

  @Transform(({ value }) => ({ id: value } as Aluno))
  @IsValidProperty(({ id }) => isInt(id))
  aluno: Aluno;

  @Transform(({ value }) => ({ id: value } as Agenda))
  @IsValidProperty(({ id }) => isInt(id))
  agenda: Agenda;
}
