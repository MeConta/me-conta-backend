import { Transform } from 'class-transformer';
import { Atendente } from '../../atendente/entities/atendente.entity';
import { Aluno } from '../../aluno/entities/aluno.entity';
import { Agenda } from '../../agenda/entities/agenda.entity';
import { IsInt, IsNotEmpty} from "class-validator";

export class CreateConsultaDto {
  @Transform(({ value }) => ({ id: value } as Atendente))
  //@IsNotEmpty()
  //@IsInt()
  atendente: Atendente;

  @Transform(({ value }) => ({ id: value } as Aluno))
  //@IsNotEmpty()
  //@IsInt()
  aluno: Aluno;

  @Transform(({ value }) => ({ id: value } as Agenda))
  // @IsNotEmpty()
  // @IsInt()
  agenda: Agenda;
}
