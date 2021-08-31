import { IntersectionType, PartialType } from '@nestjs/swagger';
import { CreateSupervisorDto } from './create-supervisor.dto';
import { UpdateVoluntarioDto } from '../../voluntario/dto/update-voluntario.dto';
import { Transform } from 'class-transformer';
import { Atendente } from '../../atendente/entities/atendente.entity';

export class UpdateSupervisorDto extends IntersectionType(
  PartialType(CreateSupervisorDto),
  PartialType(UpdateVoluntarioDto),
) {
  @Transform(({ value }) => value.map((obj) => obj.id))
  atendentes: Atendente[];
}
