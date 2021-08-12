import { Usuario } from '../../usuario/entities/usuario.entity';
import { GrauEnsinoMedio, TipoEscola } from '../entities/aluno.enum';
import { IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateAlunoDto {
  @Transform(({ value }) => value.id)
  usuario: Usuario;

  @IsEnum(TipoEscola)
  tipoEscola: TipoEscola;

  @IsEnum(GrauEnsinoMedio)
  grauEnsinoMedio: GrauEnsinoMedio;
}
