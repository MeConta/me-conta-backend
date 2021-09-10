import { Inject, Injectable } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../usuario/entities/usuario.entity';
import { TokenDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsuarioService)
    private usuarioService: UsuarioService,

    @Inject(JwtService)
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<Usuario> {
    const usuario = await this.usuarioService.findOneByEmail(email);

    if (usuario && usuario.senha === (await bcrypt.hash(pass, usuario.salt))) {
      return usuario;
    }

    return null;
  }

  login(user: Usuario): TokenDto {
    const payload = { email: user.email, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
