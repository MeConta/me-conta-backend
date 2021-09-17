import { Transform } from 'class-transformer';
import { Atendente } from '../../atendente/entities/atendente.entity';
import { Aluno } from '../../aluno/entities/aluno.entity';
import { Agenda } from '../../agenda/entities/agenda.entity';
import { isInt } from 'class-validator';
import { IsValidProperty } from '../../../src/pipes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConsultaDto {
  @ApiProperty({
    type: () => Number,
  })
  @IsValidProperty(({ id }) => isInt(id))
  @Transform(({ value }) => ({ id: value } as Atendente))
  atendente: Atendente;

  @ApiProperty({
    type: () => Number,
  })
  @Transform(({ value }) => ({ id: value } as Aluno))
  @IsValidProperty(({ id }) => isInt(id))
  aluno: Aluno;

  @ApiProperty({
    type: () => Number,
  })
  @Transform(({ value }) => ({ id: value } as Agenda))
  @IsValidProperty(({ id }) => isInt(id))
  agenda: Agenda;
}
