import { CreateVoluntarioDto } from '../../voluntario/dto/create-voluntario.dto';
import { AreaAtuacao } from '../entities/supervisor.enum';
import { IsEnum } from 'class-validator';
import { IntersectionType, OmitType } from '@nestjs/swagger';
import { ConclusaoDto } from '../../voluntario/dto/common/conclusao.dto';
import { Exclude } from 'class-transformer';

export class CreateSupervisorDto extends IntersectionType(
  CreateVoluntarioDto,
  OmitType(ConclusaoDto, ['formado'] as const),
) {
  @IsEnum(AreaAtuacao)
  areaAtuacao: AreaAtuacao;

  /***
   * O supervisor SEMPRE será formado
   */
  @Exclude()
  formado? = true;
}
