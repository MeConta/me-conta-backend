import { TipoUsuario } from '../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';

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
