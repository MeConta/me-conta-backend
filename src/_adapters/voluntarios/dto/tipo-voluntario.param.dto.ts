import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  FrenteAtuacao,
  StatusAprovacao,
} from '../../../_business/voluntarios/entidades/voluntario.entity';

export class VoluntarioParams {
  /***
   * Tipo de Voluntário a ser recuperado:
   * 1. SUPERVISOR
   * 1. ATENDENTE
   */
  @ApiProperty({
    enum: [TipoUsuario.SUPERVISOR, TipoUsuario.ATENDENTE],
    required: false,
  })
  @IsOptional()
  @IsEnum([TipoUsuario.ATENDENTE, TipoUsuario.SUPERVISOR], {
    message: '$property deve ser um tipo válido',
  })
  @Type(() => Number)
  tipo: TipoUsuario;
}

export class VoluntarioQuery {
  @ApiProperty({
    enum: FrenteAtuacao,
    required: false,
  })
  @IsEnum(FrenteAtuacao, {
    message: '$property deve ser uma frente de atuação válida',
  })
  @IsOptional()
  @Type(() => Number)
  frente: FrenteAtuacao;

  /***
   * Tipo de Status:
   * 1. REPROVADO
   * 2. APROVADO
   * 3. ABERTO
   */
  @ApiProperty({
    enum: [
      StatusAprovacao.REPROVADO,
      StatusAprovacao.APROVADO,
      StatusAprovacao.ABERTO,
    ],
    required: false,
  })
  @IsOptional()
  @IsEnum(
    [
      StatusAprovacao.REPROVADO,
      StatusAprovacao.APROVADO,
      StatusAprovacao.ABERTO,
    ],
    {
      message: '$property deve ser um tipo de status válido',
    },
  )
  @Type(() => Number)
  status: StatusAprovacao;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString({
    message: '$property deve ser textual',
  })
  @IsOptional()
  @Type(() => String)
  nome: string;
}
