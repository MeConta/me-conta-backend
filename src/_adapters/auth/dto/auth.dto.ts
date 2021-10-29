import {
  IAuth,
  ILogin,
  IToken,
  ITokenPayload,
  ITokenUser,
} from '../../../_business/auth/interfaces/auth';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { Usuario } from '../../../_business/usuarios/entidades/usuario.entity';

export class Login implements ILogin {
  user: Usuario;
}

export class AuthDto implements IAuth {
  /***
   * E-mail do usuário
   * @example teste@teste.com
   */
  username: string;

  /***
   * Senha do usuário
   * @example s3nN4val!d@
   */
  password: string;
}

export class TokenDto implements IToken {
  /***
   * Token JWT
   */
  token: string;
  tipo: TipoUsuario;
}

export class TokenPayload implements ITokenPayload {
  email: string;
  roles: TipoUsuario[];
  sub: number;
}

export class TokenUser implements ITokenUser {
  email: string;
  id: number;
  roles: TipoUsuario[];
}
