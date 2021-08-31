import { CreateVoluntarioDto } from '../../voluntario/dto/create-voluntario.dto';
import { AreaAtuacao } from '../entities/supervisor.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSupervisorDto extends CreateVoluntarioDto {
  @ApiProperty()
  @IsEnum(AreaAtuacao)
  areaAtuacao: AreaAtuacao;

  @ApiProperty()
  @IsNotEmpty()
  crp: string;
}
