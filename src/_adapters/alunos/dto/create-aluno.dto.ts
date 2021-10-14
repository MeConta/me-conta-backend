import {
  Escolaridade,
  NovoAluno,
  TipoEscola,
} from '../../../_business/alunos/entidades/aluno.entity';
import {
  Estado,
  Genero,
} from '../../../_business/usuarios/entidades/usuario.entity';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { IsPhone } from '../../../decorators/phone.decorator';
import { Type } from 'class-transformer';

export class CreateAlunoDto implements Omit<NovoAluno, 'usuario'> {
  /***
   * Telefone do voluntário
   * @example '(11) 91234-5678'
   */
  @IsNotEmpty({
    message: '$property não deve ser vazio',
  })
  @IsPhone({
    message: '$property deve ser um telefone válido',
  })
  telefone: string;

  /***
   * Data de Nascimento
   * @example '1996-07-12'
   * @Type Date
   */
  @IsNotEmpty({
    message: '$property não deve ser vazio',
  })
  @IsDate({
    message: '$property deve ser uma data',
  })
  @Type(() => Date)
  dataNascimento: Date;

  /***
   * Cidade
   * @example 'Acrelândia'
   */
  @IsNotEmpty({
    message: '$property não deve ser vazio',
  })
  @IsString({
    message: '$property deve ser textual',
  })
  cidade: string;

  /***
   * Estado
   * @example 'AC'
   * @type Estado
   */
  @IsNotEmpty({
    message: '$property não deve ser vazio',
  })
  @IsEnum(Estado, {
    message: '$property deve ser um valor de enum válido',
  })
  estado: Estado;

  /***
   * Gênero
   * @example 'ND'
   * @type Genero
   */
  @IsNotEmpty({
    message: '$property não deve ser vazio',
  })
  @IsEnum(Genero, {
    message: '$property deve ser um valor de enum válido',
  })
  genero: Genero;

  /***
   * Tipo da escola
   * @type Number
   * @enum TipoEscola
   * @example 0
   */
  @IsNotEmpty({
    message: '$property não deve ser vazio',
  })
  @IsEnum(TipoEscola, {
    message: '$property deve ser um valor de enum válido',
  })
  tipoEscola: TipoEscola;

  /***
   * Nível de escolaridade
   * @enum Escolaridade
   * @type Number
   * @example 0
   */
  @IsNotEmpty({
    message: '$property não deve ser vazio',
  })
  @IsEnum(Escolaridade, {
    message: '$property deve ser um valor de enum válido',
  })
  escolaridade: Escolaridade;
}
