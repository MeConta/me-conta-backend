import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { TipoUsuario } from '../../usuarios/casos-de-uso/cadastrar-novo-usuario.feat';

export interface ILogin {
  user: Usuario;
}

export interface IToken {
  token: string;
  refreshToken: string;
  tipo: TipoUsuario;
  nome: string;
  perfilCompleto: boolean;
  permissaoNavegar: boolean;
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

export interface IRefreshToken {
  refreshToken: string;
}
