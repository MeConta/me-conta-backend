import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Tipo } from '../../usuario/entities/usuario.enum';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  private matchRoles(roles: Tipo[], userRoles: Tipo[]): boolean {
    return !!userRoles.filter((role) => roles.includes(role));
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Tipo[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = ExtractJwt.fromAuthHeaderAsBearerToken();
    const token2 = ExtractJwt.fromAuthHeaderWithScheme('Bearer');
    // TODO: feat(#5): autorização jwt
    const boneco = token(request.headers.authorization);
    const user = request.user;

    return this.matchRoles(roles, user.roles);
  }
}
