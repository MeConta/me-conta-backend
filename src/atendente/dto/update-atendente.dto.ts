import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { CreateAtendenteDto } from './create-atendente.dto';
import { Transform } from 'class-transformer';
import { Supervisor } from '../../supervisor/entities/supervisor.entity';
import { UpdateVoluntarioDto } from '../../voluntario/dto/update-voluntario.dto';

export class UpdateAtendenteDto extends IntersectionType(
  PartialType(CreateAtendenteDto),
  PartialType(UpdateVoluntarioDto),
) {
  @Transform(({ value }) => ({ id: value } as Supervisor))
  supervisor: Supervisor;
}
