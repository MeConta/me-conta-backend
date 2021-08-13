import { IsDate } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Atendente } from '../../atendente/entities/atendente.entity';
import { Consulta } from '../../consulta/entities/consulta.entity';

export class CreateAgendaDto {
  @IsDate()
  @Type(() => Date)
  data: Date;

  @Transform(({ value }) => value.id)
  atendente: Atendente;

  @Transform(({ value }) => value.id)
  consulta: Consulta;
}
