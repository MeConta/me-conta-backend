import { Injectable } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(private usuarioService: UsuarioService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const usuario = await this.usuarioService.findOneByEmail(email);

    if (usuario && usuario.senha == pass) {
      const { senha, ...result } = usuario;
      return result;
    }

    return null;
  }
}
