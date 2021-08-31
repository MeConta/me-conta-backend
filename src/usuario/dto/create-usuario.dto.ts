import { Estado, Genero, Tipo } from '../entities/usuario.enum';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  Matches,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Erros, Regex } from 'src/config/constants';

export class CreateUsuarioDto {
  @ApiProperty({
    example: 'Maria',
  })
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    minLength: 8,
    description: Erros.VALIDACAO_SENHA,
    pattern: Regex.SENHA,
  })
  @IsNotEmpty()
  @Matches(new RegExp(Regex.SENHA), {
    message: () => `$property ${Erros.VALIDACAO_SENHA}`,
  })
  senha: string;

  @ApiProperty({
    format: process.env.CONSULTA_DATA_FORMAT || 'YYYY-MM-DD',
  })
  @IsDate()
  @Type(() => Date)
  dataNascimento: Date;

  @ApiProperty({
    enum: Genero,
    example: Genero.FEMININO,
  })
  @IsEnum(Genero)
  genero: Genero;

  @ApiProperty({
    enum: Estado,
    example: Estado.AC,
  })
  @IsEnum(Estado)
  UF: Estado;

  @ApiProperty({
    example: 'Acrelândia',
  })
  @IsNotEmpty()
  cidade: string;

  @ApiProperty({
    description: Erros.VALIDACAO_SENHA,
    pattern: Regex.TELEFONE,
    example: '(81) 91234-5678',
  })
  @IsNotEmpty()
  // Não use @IsPhoneNumber('BR') pois o formato permite números estrangeiros.
  @Matches(new RegExp(Regex.TELEFONE), {
    message: () => `$property ${Erros.VALIDACAO_TELEFONE}`,
  })
  telefone: string;

  @ApiProperty({
    description: 'email válido',
    example: 'teste@teste.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    enum: Tipo,
    default: Tipo.ADMINISTRADOR,
  })
  @IsEnum(Tipo)
  tipoUsuario: Tipo;
}
