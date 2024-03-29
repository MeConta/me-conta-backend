import {
  IAuth,
  ILogin,
  IToken,
  ITokenPayload,
  ITokenUser,
  IRefreshToken,
} from '../../../_business/auth/interfaces/auth';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { Usuario } from '../../../_business/usuarios/entidades/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

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
  /***
   * Refresh Token JWT
   */
  refreshToken: string;
  /***
   * Tipo do usuário logado
   * @enum TipoUsuario
   * @example 0
   */
  @ApiProperty({
    type: Number,
  })
  tipo: TipoUsuario;
  /***
   * Nome do usuário
   * @example John Doe
   */
  @ApiProperty({
    type: String,
  })
  nome: string;

  @ApiProperty({
    type: Boolean,
  })
  perfilCompleto: boolean;
}

export class RefreshTokenDto implements IRefreshToken {
  @ApiProperty({ type: String })
  refreshToken: string;
}

export class TokenPayload implements ITokenPayload {
  email: string;
  roles: TipoUsuario[];
  sub: number;
  permissaoNavegar: boolean;
}

export class TokenUser implements ITokenUser {
  email: string;
  id: number;
  roles: TipoUsuario[];
}
