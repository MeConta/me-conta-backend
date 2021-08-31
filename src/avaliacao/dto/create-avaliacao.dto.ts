import { Transform } from 'class-transformer';
import { Consulta } from '../../consulta/entities/consulta.entity';
import { isInt, IsNotEmpty, Max, Min } from 'class-validator';
import { IsValidProperty } from '../../pipes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAvaliacaoDto {
  @ApiProperty()
  @Transform(({ value }) => ({ id: value } as Consulta))
  @IsValidProperty(({ id }) => isInt(id))
  consulta: Consulta;

  @ApiProperty()
  @Min(0)
  @Max(5)
  @IsNotEmpty()
  nota: number;

  @ApiProperty()
  @IsNotEmpty()
  comentario: string;

  @ApiProperty()
  @IsNotEmpty()
  mostrar: boolean;

  @ApiProperty()
  @IsNotEmpty()
  anonimo: boolean;
}
