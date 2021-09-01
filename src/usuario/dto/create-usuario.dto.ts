import { Estado, Genero, Tipo } from '../entities/usuario.enum';
import { IsDate, IsEmail, IsEnum, IsNotEmpty, Matches } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Erros, Regex } from '../../config/constants';

export class CreateUsuarioDto {
  /***
   * @example 'Maria Silva'
   */
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

  /***
   * @type Date
   * @example '1988-03-09'
   */
  @ApiProperty({
    format: 'YYYY-MM-DD',
  })
  @IsDate()
  @Type(() => Date)
  dataNascimento: Date;

  @IsEnum(Genero)
  genero: Genero;

  @IsEnum(Estado)
  UF: Estado;

  /***
   * @example 'Acrelândia'
   */
  @IsNotEmpty()
  cidade: string;

  /*** **Obs:** Não utilizamos *@IsPhoneNumber('BR')* pois o formato permite números estrangeiros.
   * @example '(81) 91234-5678'
   */
  @ApiProperty({
    description: Erros.VALIDACAO_TELEFONE,
    pattern: Regex.TELEFONE,
  })
  @IsNotEmpty()
  @Matches(new RegExp(Regex.TELEFONE), {
    message: () => `$property ${Erros.VALIDACAO_TELEFONE}`,
  })
  telefone: string;

  /***
   * Um e-mail válido
   * @example 'teste@teste.com'
   */
  @IsEmail()
  email: string;

  @IsEnum(Tipo)
  tipoUsuario: Tipo;
}
