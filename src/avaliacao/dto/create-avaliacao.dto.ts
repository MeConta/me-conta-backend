import { Transform } from 'class-transformer';
import { Consulta } from '../../consulta/entities/consulta.entity';
import { isInt, IsNotEmpty, Max, Min } from 'class-validator';
import { IsValidProperty } from '../../pipes';

export class CreateAvaliacaoDto {
  @Transform(({ value }) => ({ id: value } as Consulta))
  @IsValidProperty(({ id }) => isInt(id))
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
