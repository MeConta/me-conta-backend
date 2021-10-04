import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { IToken, ITokenPayload } from '../interfaces/auth';
import { IJwtService } from '../interfaces/jwt.service';

export class GerarToken {
  constructor(private readonly jwtService: IJwtService) {}
  execute(usuario: Usuario): IToken {
    const payload: ITokenPayload = {
      email: usuario.email,
      sub: usuario.id,
      roles: [usuario.tipo],
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
