import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '../../../_business/usuarios/entidades/usuario.entity';
import { TokenDto, TokenPayload } from '../dto';
import { TypeormUsuarioService } from '../../usuarios/typeorm-usuario.service';
import { IBuscarUsuarioViaEmail } from '../../../_business/usuarios/casos-de-uso/buscar-usuario-email.feat';
import { IHashService } from '../../../_business/usuarios/interfaces/hash.service';
import { BcryptHashService } from '../../usuarios/bcrypt-hash.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(TypeormUsuarioService)
    private usuarioService: IBuscarUsuarioViaEmail,

    @Inject(BcryptHashService)
    private readonly hashService: IHashService,
    @Inject(JwtService)
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<Usuario> {
    const usuario = await this.usuarioService.findByEmail(email);

    if (
      !usuario ||
      usuario.senha !== (await this.hashService.hash(pass, usuario.salt))
    ) {
      return null;
    }

    return usuario;
  }

  login(user: Usuario): TokenDto {
    const payload: TokenPayload = {
      email: user.email,
      sub: user.id,
      roles: [user.tipo],
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
