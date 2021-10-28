import { IsEnum, IsOptional } from 'class-validator';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TipoUsuarioParam {
  @ApiProperty({
    enum: [TipoUsuario.ATENDENTE, TipoUsuario.SUPERVISOR],
    type: Number,
    example: 1,
  })
  @IsOptional()
  @IsEnum([TipoUsuario.ATENDENTE, TipoUsuario.SUPERVISOR], {
    message: '$property deve ser um tipo válido',
  })
  @Type(() => Number)
  tipo: TipoUsuario;
}
