import { CreateVoluntarioDto } from '../../voluntario/dto/create-voluntario.dto';
import { AreaAtuacao } from '../entities/supervisor.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateSupervisorDto extends CreateVoluntarioDto {
  @IsEnum(AreaAtuacao)
  areaAtuacao: AreaAtuacao;

  @IsNotEmpty()
  crp: string;
}
