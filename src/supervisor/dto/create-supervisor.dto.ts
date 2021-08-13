import { CreateVoluntarioDto } from '../../voluntario/dto/create-voluntario.dto';
import { Transform } from 'class-transformer';
import { AreaAtuacao } from '../entities/supervisor.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Atendente } from '../../atendente/entities/atendente.entity';

export class CreateSupervisorDto extends CreateVoluntarioDto {
  @IsEnum(AreaAtuacao)
  areaAtuacao: AreaAtuacao;

  @IsNotEmpty()
  crp: string;

  @Transform(({ value }) => value.map((obj) => obj.id))
  atendentes: Atendente[];
}
