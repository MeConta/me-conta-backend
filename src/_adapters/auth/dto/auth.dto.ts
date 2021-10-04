import { Usuario } from '../../../_business/usuarios/entidades/usuario.entity';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';

export class LoginDto {
  user: Usuario;
}
export interface TokenDto {
  token: string;
}
export interface TokenPayload {
  sub: number;
  email: string;
  roles: TipoUsuario[];
}

export interface TokenUser {
  id: number;
  email: string;
  roles: TipoUsuario[];
}

export class AuthDto {
  /***
   * @example teste@teste.com
   */
  username: string;
  /***
   * @example s3nN4val!d@
   */
  password: string;
}
