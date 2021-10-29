import { IsEnum, IsOptional } from 'class-validator';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TipoUsuarioParam {
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
