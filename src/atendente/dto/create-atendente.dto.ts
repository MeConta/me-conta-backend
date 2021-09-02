import { IsNotEmpty, Length, Max, Min, ValidateIf } from 'class-validator';
import { CreateVoluntarioDto } from '../../voluntario/dto/create-voluntario.dto';

export class CreateAtendenteDto extends CreateVoluntarioDto {
  @IsNotEmpty()
  formado: boolean;

  @Min(1)
  @Max(10)
  semestre: number;

  @Length(4, 4)
  anoConclusao?: number;

  @ValidateIf((dto: CreateAtendenteDto) => !!dto.anoConclusao)
  especializacao?: string;

  @ValidateIf((dto: CreateAtendenteDto) => !!dto.anoConclusao)
  crp?: string;
}
