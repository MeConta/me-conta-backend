import { CreateUsuarioDto } from '../../usuario/dto/create-usuario.dto';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { IsNotEmpty, Length, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateAtendenteDto extends CreateUsuarioDto {
  @IsNotEmpty()
  formado: boolean;

  @Min(1)
  @Max(10)
  semestre: number;

  @IsNotEmpty()
  especializacao: string;

  @Length(4, 4)
  anoFormacao: number;

  @IsNotEmpty()
  descricao: string;

  @IsNotEmpty()
  instituicao: string;

  @Transform(({ value }) => value.id)
  usuario: Usuario;
}
