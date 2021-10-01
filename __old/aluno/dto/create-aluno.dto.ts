import { GrauEnsinoMedio, TipoEscola } from '../entities/aluno.enum';
import { IsEnum } from 'class-validator';
import { CreateUsuarioDto } from '../../../src/usuario/dto/create-usuario.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class CreateAlunoDto extends OmitType(CreateUsuarioDto, [
  'tipoUsuario',
] as const) {
  @IsEnum(TipoEscola)
  tipoEscola: TipoEscola;

  @ApiProperty({
    type: () => Number,
    example: 1,
  })
  @IsEnum(GrauEnsinoMedio)
  grauEnsinoMedio: GrauEnsinoMedio;
}
