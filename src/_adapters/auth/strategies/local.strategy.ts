import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Usuario } from '../../../_business/usuarios/entidades/usuario.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AuthService)
    private authService: AuthService,
  ) {
    super();
  }

  async validate(email: string, password: string): Promise<Usuario> {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Email ou senha inválido(s)!');
    }

    return user;
  }
}
