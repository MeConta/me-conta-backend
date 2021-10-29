import { Usuario } from '../../../_business/usuarios/entidades/usuario.entity';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { Exclude } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class UsuarioDto implements Usuario {
  id: number;

  dataTermos: Date;

  /***
   * @example teste@teste.com
   */
  email: string;

  /***
   * @example Maria da Silva
   */
  nome: string;

  @Exclude()
  @ApiHideProperty()
  salt: string;

  @Exclude()
  @ApiHideProperty()
  senha: string;

  @ApiProperty({
    enum: TipoUsuario,
    type: Number,
    example: 1,
  })
  tipo: TipoUsuario;
}
