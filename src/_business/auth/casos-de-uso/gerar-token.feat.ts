import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { Token, TokenPayload } from '../interfaces/auth';

export interface IJwtService {
  sign(payload: any): string;
}

export class GerarToken {
  constructor(private readonly jwtService: IJwtService) {}
  execute(usuario: Usuario): Token {
    const payload: TokenPayload = {
      email: usuario.email,
      sub: usuario.id,
      roles: [usuario.tipo],
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
