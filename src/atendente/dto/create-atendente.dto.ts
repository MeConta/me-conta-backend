import { IntersectionType } from '@nestjs/swagger';
import { IsNotEmpty, Max, Min } from 'class-validator';
import { CreateVoluntarioDto } from '../../voluntario/dto/create-voluntario.dto';
import { ConclusaoDto } from '../../voluntario/dto/common/conclusao.dto';

export class CreateAtendenteDto extends IntersectionType(
  CreateVoluntarioDto,
  ConclusaoDto,
) {
  @IsNotEmpty()
  formado: boolean;

  @Min(1)
  @Max(10)
  semestre: number;
}
