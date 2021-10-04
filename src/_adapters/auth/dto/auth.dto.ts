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
   * @example teste@teste.com
   */
  password: string;
  /***
   * @example s3nN4val!d@
   */
  username: string;
}

export class TokenDto implements IToken {
  token: string;
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
