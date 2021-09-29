import { IsEmail, IsEnum, IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Erros, Regex } from '../../config/constants';
import { Tipo } from '../../usuario/entities/usuario.enum';

export class CreateCadastroInicialDto {
  @IsNotEmpty()
  nome: string;

  /***
   * @minLength 8
   * @example 's#nh4Valida'
   */
  @ApiProperty({
    description: Erros.VALIDACAO_SENHA,
    pattern: Regex.SENHA,
  })
  @IsNotEmpty()
  @Matches(new RegExp(Regex.SENHA), {
    message: () => `$property ${Erros.VALIDACAO_SENHA}`,
  })
  senha: string;

  @ApiProperty({
    description: Erros.VALIDACAO_EMAIL,
  })
  @IsEmail({}, { message: Erros.VALIDACAO_EMAIL })
  email: string;

  @IsEnum(Tipo)
  tipoUsuario: Tipo;
}
