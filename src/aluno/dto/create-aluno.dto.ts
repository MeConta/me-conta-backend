import { GrauEnsinoMedio, TipoEscola } from '../entities/aluno.enum';
import { IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { CreateUsuarioDto } from '../../usuario/dto/create-usuario.dto';
import { OmitType } from '@nestjs/mapped-types';

export class CreateAlunoDto extends OmitType(CreateUsuarioDto, [
  'tipoUsuario',
] as const) {
  @IsEnum(TipoEscola)
  tipoEscola: TipoEscola;

  @IsEnum(GrauEnsinoMedio)
  grauEnsinoMedio: GrauEnsinoMedio;
}
