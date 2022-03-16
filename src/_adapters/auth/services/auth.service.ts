import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '../../../_business/usuarios/entidades/usuario.entity';
import { TypeormUsuarioService } from '../../usuarios/services/typeorm-usuario.service';
import { IHashCompareService } from '../../../_business/usuarios/services/hash.service';
import { BcryptHashService } from '../../usuarios/services/bcrypt-hash.service';
import { IAuthService } from '../../../_business/auth/interfaces/auth.service';
import { ValidarUsuario } from '../../../_business/auth/casos-de-uso/validar-usuario.feat';
import { GerarToken } from '../../../_business/auth/casos-de-uso/gerar-token.feat';
import { IJwtService } from '../../../_business/auth/interfaces/jwt.service';
import { TokenDto } from '../dto/auth.dto';
import {
  IAtualizarUsuario,
  IAtualizarUsuarioService,
  IBuscarUsuarioViaEmailService,
} from '../../../_business/usuarios/services/usuario.service';
import { AtualizarUsuario } from '../../../_business/usuarios/casos-de-uso/atualizar-usuario.feat';
import { IBuscarUsuarioViaId } from 'src/_business/usuarios/casos-de-uso/buscar-usuario.id.feat';

@Injectable()
export class NestAuthService extends ValidarUsuario {
  constructor(
    @Inject(TypeormUsuarioService)
    usuarioService: IBuscarUsuarioViaEmailService,

    @Inject(BcryptHashService)
    hashService: IHashCompareService,
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
export class NestLogoutService extends AtualizarUsuario {
  constructor(
    @Inject(TypeormUsuarioService)
    usuarioService: IBuscarUsuarioViaId &
      IAtualizarUsuarioService &
      IBuscarUsuarioViaEmailService,
  ) {
    super(usuarioService);
  }
}

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(NestAuthService)
    private auth: NestAuthService,
    @Inject(NestLoginService)
    private token: GerarToken,
    @Inject(NestLogoutService)
    private invalidateRefreshToken: NestLogoutService,
  ) {}

  async validateUser(email: string, senha: string): Promise<Usuario> {
    return this.auth.execute(email, senha);
  }

  login(user: Usuario): TokenDto {
    return this.token.execute(user);
  }

  logout(
    id: number,
    input: IAtualizarUsuario = { refreshTokenHashed: null },
  ): void {
    this.invalidateRefreshToken.execute(id, input);
  }
}
