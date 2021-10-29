import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { TipoUsuario } from '../../usuarios/casos-de-uso/cadastrar-novo-usuario.feat';

export interface ILogin {
  user: Usuario;
}

export interface IToken {
  token: string;
  tipo: TipoUsuario;
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

export interface IAuth {
  username: string;
  password: string;
}
