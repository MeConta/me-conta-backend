import { IntersectionType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, Max, Min } from 'class-validator';
import { ConclusaoDto } from 'src/voluntario/dto/common/conclusao.dto';
import { CreateVoluntarioDto } from '../../voluntario/dto/create-voluntario.dto';

export class CreateAtendenteDto extends IntersectionType(
  CreateVoluntarioDto,
  PartialType(ConclusaoDto),
) {
  @IsNotEmpty()
  formado: boolean;

  @Min(1)
  @Max(10)
  semestre: number;
}
