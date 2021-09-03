import { CreateVoluntarioDto } from '../../voluntario/dto/create-voluntario.dto';
import { AreaAtuacao } from '../entities/supervisor.enum';
import { IsEnum } from 'class-validator';
import { ConclusaoDto } from 'src/voluntario/dto/common/conclusao.dto';

export class CreateSupervisorDto extends CreateVoluntarioDto {
  @IsEnum(AreaAtuacao)
  areaAtuacao: AreaAtuacao;

  conclusao: ConclusaoDto;
}
