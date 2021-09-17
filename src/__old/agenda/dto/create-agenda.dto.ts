import { IsDate, isInt, MaxDate, MinDate } from 'class-validator';
import { Transform } from 'class-transformer';
import { Atendente } from '../../atendente/entities/atendente.entity';
import { IsValidProperty } from '../../pipes';
import * as moment from 'moment';
import { ApiProperty } from '@nestjs/swagger';

const MIN_DATE = moment()
  .add(process.env.CONSULTA_DATA_MIN || 2, 'day')
  .startOf('day');

const MAX_DATE = moment()
  .add(process.env.CONSULTA_DATA_MAX || 4, 'month')
  .endOf('month');
export class CreateAgendaDto {
  /***
   * Data mínima de 1 dia para frente e máxima de 4 meses para frente
   * @format ISO8601
   */
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
  @MinDate(MIN_DATE.toDate())
  @MaxDate(MAX_DATE.toDate())
  data: Date;

  @ApiProperty({
    type: () => Number,
  })
  @Transform(({ value }) => ({ id: value } as Atendente))
  @IsValidProperty(({ id }) => isInt(id))
  atendente: Atendente;
}
