import { Inject, Injectable } from '@nestjs/common';
import { UsuarioService } from '../../__old/usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../_business/usuarios/entidades/usuario.entity';
import { TokenDto, TokenPayload } from './dto';

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

    if (!usuario || usuario.senha !== (await bcrypt.hash(pass, usuario.salt))) {
      return null;
    }

    return usuario;
  }

  login(user: Usuario): TokenDto {
    const payload: TokenPayload = {
      email: user.email,
      sub: user.id,
      roles: [user.tipoUsuario],
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
