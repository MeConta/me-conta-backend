import {
  FrenteAtuacao,
  NovoVoluntario,
} from '../../../_business/usuarios/casos-de-uso/cadastrar-voluntario.feat';
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { IsPhone } from '../../../decorators/phone.decorator';
import { Transform, Type } from 'class-transformer';
import {
  Estado,
  Genero,
  Usuario,
} from '../../../_business/usuarios/entidades/usuario.entity';

export class CreateVoluntarioDto implements NovoVoluntario {
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
   * Instituição de ensino
   * @example 'Faculdade'
   */
  @IsNotEmpty({
    message: '$property não deve ser vazio',
  })
  instituicao: string;

  /***
   * O Voluntário está formado?
   */
  @IsNotEmpty({
    message: '$property não deve ser vazio',
  })
  formado: boolean;

  /***
   * Frentes de Atuação do voluntário
   * @isArray true
   * @example '[0]'
   * @type Number
   */
  @IsNotEmpty({
    message: '$property não deve ser vazio',
  })
  @IsArray({
    message: '$property deve ser um array',
  })
  @ArrayMinSize(1, {
    message: '$property deve ter ao menos 1 elemento(s)',
  })
  @IsEnum(FrenteAtuacao, {
    each: true,
    message: '$property deve ser um valor de enum válido',
  })
  frentes: FrenteAtuacao[];

  /***
   * Semestre de estudo (em caso de estudante)
   */
  @IsOptional()
  @Min(1)
  @Max(10)
  @IsNumber()
  semestre: number;

  /***
   * Ano de Formação
   */
  @IsOptional()
  @IsNumber()
  anoFormacao: number;

  /***
   * CRP do profissional (quando aplicável)
   */
  @IsOptional()
  @IsString()
  crp: string;

  /***
   * Id de Usuário relacionado a este voluntário
   * @type Number
   * @example 1
   */
  @IsNotEmpty({
    message: '$property não deve ser vazio',
  })
  @Transform((value) => ({
    id: value.value,
  }))
  usuario: Usuario;
}
