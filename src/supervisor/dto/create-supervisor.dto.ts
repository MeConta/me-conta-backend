import { CreateVoluntarioDto } from '../../voluntario/dto/create-voluntario.dto';
import { AreaAtuacao } from '../entities/supervisor.enum';
import { IsEnum } from 'class-validator';
import { IntersectionType } from '@nestjs/swagger';
import { ConclusaoDto } from '../../voluntario/dto/common/conclusao.dto';

export class CreateSupervisorDto extends IntersectionType(
  CreateVoluntarioDto,
  ConclusaoDto,
) {
  @IsEnum(AreaAtuacao)
  areaAtuacao: AreaAtuacao;
}
