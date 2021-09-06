import { IntersectionType } from '@nestjs/swagger';
import { CreateVoluntarioDto } from '../../voluntario/dto/create-voluntario.dto';
import { ConclusaoDto } from '../../voluntario/dto/common/conclusao.dto';

export class CreateAtendenteDto extends IntersectionType(
  CreateVoluntarioDto,
  ConclusaoDto,
) {}
