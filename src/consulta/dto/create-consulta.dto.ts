import { Transform } from 'class-transformer';
import { Atendente } from '../../atendente/entities/atendente.entity';
import { Aluno } from '../../aluno/entities/aluno.entity';
import { Agenda } from '../../agenda/entities/agenda.entity';

export class CreateConsultaDto {
  @Transform(({ value }) => value.id)
  atendente: Atendente;

  @Transform(({ value }) => value.id)
  aluno: Aluno;

  @Transform(({ value }) => value.id)
  agenda: Agenda;
}
