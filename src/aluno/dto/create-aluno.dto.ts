import { Usuario } from '../../usuario/entities/usuario.entity';
import { GrauEnsinoMedio, TipoEscola } from '../entities/aluno.enum';
import { IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { CreateUsuarioDto } from '../../usuario/dto/create-usuario.dto';

export class CreateAlunoDto extends CreateUsuarioDto {
  @Transform(({ value }) => value.id)
  usuario: Usuario;

  @IsEnum(TipoEscola)
  tipoEscola: TipoEscola;

  @IsEnum(GrauEnsinoMedio)
  grauEnsinoMedio: GrauEnsinoMedio;
}
