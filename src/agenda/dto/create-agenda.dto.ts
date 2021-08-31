import { IsDate, isInt, MaxDate, MinDate } from 'class-validator';
import { Transform } from 'class-transformer';
import { Atendente } from '../../atendente/entities/atendente.entity';
import { IsValidProperty } from '../../pipes';
import * as moment from 'moment';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAgendaDto {
  @Transform(({ value }) =>
    moment(
      value,
      process.env.DATETIME_FORMAT || 'YYYY-MM-DDThh:mm',
      true,
    ).toDate(),
  )
  @IsDate({
    message: () =>
      `$property must be a Date instance (format: ${
        process.env.DATETIME_FORMAT || 'YYYY-MM-DDThh:mm'
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
  @ApiProperty()
  @IsDate()
  data: Date;

  @ApiProperty()
  @Transform(({ value }) => ({ id: value } as Atendente))
  @IsValidProperty(({ id }) => isInt(id))
  atendente: Atendente;
}
