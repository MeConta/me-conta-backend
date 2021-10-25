import { IsEnum, IsOptional } from 'class-validator';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { Type } from 'class-transformer';

export class TipoUsuarioParam {
  @IsOptional()
  @IsEnum([TipoUsuario.ATENDENTE, TipoUsuario.SUPERVISOR], {
    message: '$property deve ser um tipo válido',
  })
  @Type(() => Number)
  tipo: TipoUsuario;
}
