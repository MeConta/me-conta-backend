import { Aluno } from '../../aluno/entities/aluno.entity';
import { Transform } from 'class-transformer';
import { Consulta } from '../../consulta/entities/consulta.entity';
import { IsNotEmpty, Max, Min } from 'class-validator';

export class CreateAvaliacaoDto {
  @Transform(({ value }) => value.id)
  aluno: Aluno;

  @Transform(({ value }) => value.id)
  consulta: Consulta;

  @Min(0)
  @Max(5)
  @IsNotEmpty()
  nota: number;

  @IsNotEmpty()
  comentario: string;

  @IsNotEmpty()
  mostrar: boolean;

  @IsNotEmpty()
  anonimo: boolean;
}
