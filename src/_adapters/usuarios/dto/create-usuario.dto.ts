import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Erros } from '../../../config/constants';
import {
  NovoUsuario,
  TipoUsuario,
} from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { IsPasswordStrong } from '../../../decorators';

export class CreateUsuarioDto implements NovoUsuario {
  /***
   * O Nome de usuário
   * @example 'Maria Silva'
   */
  @IsNotEmpty()
  @MinLength(2)
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
   * Uma senha forte
   * @example 's#nh4Valida'
   */
  @ApiProperty({
    description: Erros.VALIDACAO_SENHA,
  })
  @IsNotEmpty()
  @IsPasswordStrong()
  senha: string;

  /***
   * Um número do enum de TipoUsuario
   * @example 0
   * @type Number
   */
  @IsEnum(TipoUsuario)
  tipo: TipoUsuario;
}
