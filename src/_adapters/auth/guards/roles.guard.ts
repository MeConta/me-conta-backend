import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  private matchRoles(roles: TipoUsuario[], userRoles: TipoUsuario[]): boolean {
    return !!userRoles.filter((role) => roles.includes(role)).length;
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<TipoUsuario[]>(
      'roles',
      context.getHandler(),
    );
    if (!roles.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    return this.matchRoles(roles, request.user.roles);
  }
}
