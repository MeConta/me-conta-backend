import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  NovoUsuario,
  NovoUsuarioResponse,
  TipoUsuario,
} from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { IsNotEmptyString, IsPasswordStrong } from '../../../decorators';
import { Transform } from 'class-transformer';

export class CreateUsuarioDto implements NovoUsuario {
  /***
   * O Nome de usuário
   * @example 'Maria Silva'
   */
  @MinLength(2, {
    message: '$property deve ter mais de 2 caracteres',
  })
  @MaxLength(100, {
    message: '$property deve ter menos de 100 caracteres',
  })
  @IsNotEmptyString({
    message: '$property não deve ser vazio',
  })
  @Transform((obj) => String(obj.value).trim())
  nome: string;

  /***
   * Um e-mail válido
   * @example 'teste@teste.com'
   */

  @IsEmail({}, { message: '$property deve ser um e-mail válido' })
  email: string;

  /***
   * Uma senha forte
   * @example 's#nh4Valida'
   */
  @IsNotEmpty({
    message: '$property não pode ser vazio',
  })
  @IsPasswordStrong(null, {
    message: '$property deve ser uma senha forte',
  })
  senha: string;

  /***
   * Um número do enum de TipoUsuario
   * @example 0
   * @type Number
   */
  @IsEnum(TipoUsuario, {
    message: '$property deve ser um valor de enum válido',
  })
  tipo: TipoUsuario;
}

export class CreateUsuarioResponseDto implements NovoUsuarioResponse {
  /***
   * @example 1
   */
  id: number;
  /***
   * @example 'maria@teste.com'
   */
  email: string;
  /***
   * @example 'Maria da Silva'
   */
  nome: string;
  /***
   * @example 0
   * @type Number
   * @enum TipoUsuario
   */
  tipo: TipoUsuario;
}
