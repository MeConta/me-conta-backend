import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { IToken, ITokenPayload } from '../interfaces/auth';
import { IJwtService } from '../interfaces/jwt.service';

export class GerarToken {
  constructor(private readonly jwtService: IJwtService) {}
  execute(usuario: Usuario): IToken {
    const { email, id, tipo, nome } = usuario;
    const payload: ITokenPayload = {
      email,
      sub: id,
      roles: [tipo],
    };

    return {
      token: this.jwtService.sign(payload, {
        expiresIn: `${process.env.JWT_TIMEOUT}`,
        secret: `${process.env.JWT_SECRET}`,
      }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: `${process.env.JWT_REFRESH_TIMEOUT}`,
        secret: `${process.env.JWT_REFRESH_SECRET}`,
      }),
      tipo,
      nome,
      perfilCompleto: false,
    };
  }
}
