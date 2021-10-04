import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '../../../_business/usuarios/entidades/usuario.entity';
import { Token } from '../dto';
import { TypeormUsuarioService } from '../../usuarios/typeorm-usuario.service';
import { IBuscarUsuarioViaEmail } from '../../../_business/usuarios/casos-de-uso/buscar-usuario-email.feat';
import { IHashService } from '../../../_business/usuarios/interfaces/hash.service';
import { BcryptHashService } from '../../usuarios/bcrypt-hash.service';
import { IAuthService } from '../../../_business/auth/interfaces/auth.service';
import { ValidarUsuario } from '../../../_business/auth/casos-de-uso/validar-usuario.feat';
import {
  GerarToken,
  IJwtService,
} from '../../../_business/auth/casos-de-uso/gerar-token.feat';

@Injectable()
export class NestAuthService extends ValidarUsuario {
  constructor(
    @Inject(TypeormUsuarioService)
    usuarioService: IBuscarUsuarioViaEmail,

    @Inject(BcryptHashService)
    hashService: IHashService,
  ) {
    super(usuarioService, hashService);
  }
}

@Injectable()
export class NestLoginService extends GerarToken {
  constructor(
    @Inject(JwtService)
    jwtService: IJwtService,
  ) {
    super(jwtService);
  }
}

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(NestAuthService)
    private auth: NestAuthService,
    @Inject(NestLoginService)
    private token: GerarToken,
  ) {}

  async validateUser(email: string, senha: string): Promise<Usuario> {
    return this.auth.execute(email, senha);
  }

  login(user: Usuario): Token {
    return this.token.execute(user);
  }
}
