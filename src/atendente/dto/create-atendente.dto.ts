import { IsNotEmpty, Length, Max, Min } from 'class-validator';
import { CreateVoluntarioDto } from '../../voluntario/dto/create-voluntario.dto';
import { PartialType } from '@nestjs/swagger';

export class CreateAtendenteDto extends PartialType(CreateVoluntarioDto) {
  @IsNotEmpty()
  formado: boolean;

  @Min(1)
  @Max(10)
  semestre: number;

  @Length(4, 4)
  anoFormacao: number;
}
