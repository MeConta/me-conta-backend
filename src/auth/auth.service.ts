import { Inject, Injectable } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsuarioService)
    private usuarioService: UsuarioService,

    @Inject(JwtService)
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const usuario = await this.usuarioService.findOneByEmail(username);

    if (usuario?.senha == (await bcrypt.hash(pass, process.env.SALT))) {
      return usuario;
    }

    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
