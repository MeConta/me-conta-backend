import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../_business/usuarios/entidades/usuario.entity';
import { TokenDto, TokenPayload } from './dto';
import { TypeormUsuarioService } from '../_adapters/usuarios/typeorm-usuario.service';
import { IBuscarUsuarioViaEmail } from '../_business/usuarios/casos-de-uso/buscar-usuario-email.feat';

@Injectable()
export class AuthService {
  constructor(
    @Inject(TypeormUsuarioService)
    private usuarioService: IBuscarUsuarioViaEmail,

    @Inject(JwtService)
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<Usuario> {
    const usuario = await this.usuarioService.findByEmail(email);

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
