import { IsDate, isInt, MaxDate, MinDate } from 'class-validator';
import { Transform } from 'class-transformer';
import { Atendente } from '../../atendente/entities/atendente.entity';
import { IsValidProperty } from '../../pipes';
import * as moment from 'moment';

export class CreateAgendaDto {
  @Transform(({ value }) =>
    moment(
      value,
      process.env.CONSULTA_DATA_FORMAT || 'DD/MM/YYYY hh:mm',
      true,
    ).toDate(),
  )
  @IsDate({
    message: () =>
      `$property must be a Date instance (format: ${
        process.env.CONSULTA_DATA_FORMAT || 'DD/MM/YYYY hh:mm'
      })`,
  })
  @MinDate(
    moment()
      .add(process.env.CONSULTA_DATA_MIN || 2, 'day')
      .startOf('day')
      .toDate(),
  )
  @MaxDate(
    moment()
      .add(process.env.CONSULTA_DATA_MAX || 4, 'month')
      .endOf('month')
      .toDate(),
  )
  data: Date;

  @Transform(({ value }) => ({ id: value } as Atendente))
  @IsValidProperty(({ id }) => isInt(id))
  atendente: Atendente;
}
