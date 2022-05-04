import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '../../../_business/usuarios/entidades/usuario.entity';
import { TypeormUsuarioService } from '../../usuarios/services/typeorm-usuario.service';
import {
  IHashCompareService,
  IHashHashService,
} from '../../../_business/usuarios/services/hash.service';
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
import { IBuscarUsuarioViaId } from '../../../_business/usuarios/casos-de-uso/buscar-usuario.id.feat';
import { ValidarUsuarioComRefreshToken } from '../../../_business/auth/casos-de-uso/validar-usuario-com-refresh-token.feat';
import { BuscarVoluntarioViaId } from '../../../_business/voluntarios/casos-de-uso/buscar-voluntario.id.feat';
import { TypeormVoluntarioService } from '../../../_adapters/voluntarios/services/typeorm-voluntario.service';
import { IBuscarVoluntarioViaId } from '../../../_business/voluntarios/services/voluntario.service';

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
export class NestValidaUsuarioComRefreshTokenService extends ValidarUsuarioComRefreshToken {
  constructor(
    @Inject(TypeormUsuarioService)
    usuarioService: IBuscarUsuarioViaId,

    @Inject(BcryptHashService)
    hashService: IHashCompareService,
  ) {
    super(usuarioService, hashService);
  }
}

export class NestValidaVoluntarioComPerfilCompleto extends BuscarVoluntarioViaId {
  constructor(
    @Inject(TypeormVoluntarioService) voluntarioService: IBuscarVoluntarioViaId,
  ) {
    super(voluntarioService);
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
    private updateUser: NestLogoutService,
    @Inject(BcryptHashService)
    private hashService: IHashHashService,
    @Inject(NestValidaUsuarioComRefreshTokenService)
    private validarUsuarioComRefreshToken: ValidarUsuarioComRefreshToken,
    @Inject(NestValidaVoluntarioComPerfilCompleto)
    private validaVoluntarioComPerfilCompleto: BuscarVoluntarioViaId,
  ) {}

  async validateUser(email: string, senha: string): Promise<Usuario> {
    return this.auth.execute(email, senha);
  }

  async login(user: Usuario): Promise<TokenDto> {
    const volunteerProfile =
      await this.validaVoluntarioComPerfilCompleto.execute(user.id);

    const tokensReturned = this.token.execute(user);

    const refreshTokenHashed = await this.hashService.hash(
      tokensReturned.refreshToken,
      user.salt,
    );

    tokensReturned.perfilCompleto = volunteerProfile ? true : false;

    await this.updateUser.execute(user.id, { refreshTokenHashed });

    return tokensReturned;
  }

  logout(
    id: number,
    input: IAtualizarUsuario = { refreshTokenHashed: null },
  ): void {
    this.updateUser.execute(id, input);
  }

  async refreshTokens(refreshToken: string, id: number): Promise<TokenDto> {
    const usuario = await this.validarUsuarioComRefreshToken.execute(
      refreshToken,
      id,
    );

    const newTokens = this.token.execute(usuario);

    const refreshTokenHashed = await this.hashService.hash(
      newTokens.refreshToken,
      usuario.salt,
    );

    this.updateUser.execute(usuario.id, { refreshTokenHashed });

    return newTokens;
  }
}
