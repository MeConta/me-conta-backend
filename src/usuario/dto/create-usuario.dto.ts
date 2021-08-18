import { Estado, Genero, Tipo } from '../entities/usuario.enum';
import { IsDate, IsEmail, IsEnum, IsNotEmpty, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUsuarioDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  senha: string;

  @IsDate()
  @Type(() => Date)
  dataNascimento: Date;

  @IsEnum(Genero)
  genero: Genero;

  @IsEnum(Estado)
  UF: Estado;

  @IsNotEmpty()
  cidade: string;

  @IsNotEmpty()
  telefone: string;

  @IsEmail()
  email: string;

  @IsEnum(Tipo)
  tipoUsuario: Tipo;
}
