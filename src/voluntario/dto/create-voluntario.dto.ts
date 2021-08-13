import { CreateUsuarioDto } from '../../usuario/dto/create-usuario.dto';
import { IsNotEmpty } from 'class-validator';
import { FrenteAtuacao } from '../../frente-atuacao/entities/frente-atuacao.entity';
import { Transform } from 'class-transformer';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { OmitType } from '@nestjs/mapped-types';

export abstract class CreateVoluntarioDto extends OmitType(CreateUsuarioDto, [
  'tipoUsuario',
] as const) {
  @IsNotEmpty()
  especializacao: string;

  @IsNotEmpty()
  descricao: string;

  @IsNotEmpty()
  instituicao: string;

  @Transform(({ value }) => value.id)
  usuario: Usuario;

  @Transform(({ value }) => value.map((obj) => obj.id))
  frentesAtuacao: FrenteAtuacao[];
}
