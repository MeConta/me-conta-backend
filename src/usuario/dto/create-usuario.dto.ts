import { Estado, Genero, Tipo } from '../entities/usuario.enum';
import { IsDate, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({
    example: 'Maria',
  })
  @IsNotEmpty()
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  senha: string;

  @ApiProperty({
    format: process.env.CONSULTA_DATA_FORMAT || 'DD/MM/YYYY hh:mm',
    type: Date,
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

  @ApiProperty()
  @IsNotEmpty()
  cidade: string;

  @ApiProperty()
  @IsNotEmpty()
  telefone: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({
    enum: Tipo,
    default: Tipo.ADMINISTRADOR,
  })
  @IsEnum(Tipo)
  tipoUsuario: Tipo;
}
