import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { CreateSupervisorDto } from './create-supervisor.dto';
import { UpdateVoluntarioDto } from '../../voluntario/dto/update-voluntario.dto';

export class UpdateSupervisorDto extends IntersectionType(
  PartialType(CreateSupervisorDto),
  PartialType(UpdateVoluntarioDto),
) {}
