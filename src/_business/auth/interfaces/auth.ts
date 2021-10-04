import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { TipoUsuario } from '../../usuarios/casos-de-uso/cadastrar-novo-usuario.feat';

export class LoginDto {
  user: Usuario;
}

export interface Token {
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

export class Auth {
  /***
   * @example teste@teste.com
   */
  username: string;
  /***
   * @example s3nN4val!d@
   */
  password: string;
}
