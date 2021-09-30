import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Erros, Regex } from '../../../config/constants';
import {
  NovoUsuario,
  TipoUsuario,
} from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { IsPasswordStrong } from '../../../decorators';

export class CreateUsuarioDto implements NovoUsuario {
  /***
   * @example 'Maria Silva'
   */
  @IsNotEmpty()
  nome: string;

  /***
   * Um e-mail válido
   * @example 'teste@teste.com'
   */
  @ApiProperty({
    description: Erros.VALIDACAO_EMAIL,
  })
  @IsEmail({}, { message: Erros.VALIDACAO_EMAIL })
  email: string;

  /***
   * @minLength 8
   * @example 's#nh4Valida'
   */
  @ApiProperty({
    description: Erros.VALIDACAO_SENHA,
    pattern: Regex.SENHA,
  })
  @IsNotEmpty()
  @IsPasswordStrong()
  senha: string;

  @IsEnum(TipoUsuario)
  tipo: TipoUsuario;
}
