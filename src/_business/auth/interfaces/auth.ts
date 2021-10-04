import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { TipoUsuario } from '../../usuarios/casos-de-uso/cadastrar-novo-usuario.feat';

export class ILogin {
  user: Usuario;
}

export interface IToken {
  token: string;
}

export interface ITokenPayload {
  sub: number;
  email: string;
  roles: TipoUsuario[];
}

export interface ITokenUser {
  id: number;
  email: string;
  roles: TipoUsuario[];
}

export class IAuth {
  /***
   * @example teste@teste.com
   */
  username: string;
  /***
   * @example s3nN4val!d@
   */
  password: string;
}
