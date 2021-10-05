import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  NovoUsuario,
  TipoUsuario,
} from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { IsPasswordStrong } from '../../../decorators';
import { ApiProperty } from '@nestjs/swagger';
import { Erros } from '../../../config/constants';

export class CreateUsuarioDto implements NovoUsuario {
  /***
   * O Nome de usuário
   * @example 'Maria Silva'
   */
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100, {
    message: '$property deve ter menos de 300 caracteres',
  })
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
