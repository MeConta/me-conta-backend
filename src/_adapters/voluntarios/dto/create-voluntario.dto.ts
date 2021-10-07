import { NovoVoluntario } from '../../../_business/voluntarios/casos-de-uso/cadastrar-voluntario.feat';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
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
import { Type } from 'class-transformer';
import {
  Estado,
  Genero,
} from '../../../_business/usuarios/entidades/usuario.entity';
import {
  AreaAtuacao,
  FrenteAtuacao,
} from '../../../_business/voluntarios/entidades/voluntario.entity';
import { MinAge } from '../../../decorators';

export class CreateVoluntarioDto implements Omit<NovoVoluntario, 'usuario'> {
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
  @MinAge(18, {
    message: '$property deve ser superior a 18 anos',
  })
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
  @IsBoolean({
    message: '$property deve ser um valor booleano',
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
  @IsNumber(
    {},
    {
      message: '$property deve ser numérico',
    },
  )
  @Min(1)
  @Max(10)
  @IsNotEmpty({
    message: '$property não deve ser vazio',
  })
  semestre: number;

  /***
   * Ano de Formação
   */
  @IsOptional()
  @IsNumber(
    {},
    {
      message: '$property deve ser numérico',
    },
  )
  @IsNotEmpty({
    message: '$property não deve ser vazio',
  })
  anoFormacao: number;

  /***
   * CRP do profissional (quando aplicável)
   */
  @IsOptional()
  @IsString({
    message: '$property deve ser textual',
  })
  @IsNotEmpty({
    message: '$property não deve ser vazio',
  })
  crp: string;

  /***
   * Área de atuação do voluntário
   * @type AreaAtuacao
   */
  @IsOptional()
  @IsEnum(AreaAtuacao, {
    message: '$property deve ser um valor de enum válido',
  })
  areaAtuacao: AreaAtuacao;

  /***
   * Especializações (se houver)
   */
  @IsOptional()
  @IsString({
    message: '$property deve ser textual',
  })
  @IsNotEmpty({
    message: '$property não deve ser vazio',
  })
  especializacoes: string;
}
