import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Tipo } from '../../usuario/entities/usuario.enum';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  private matchRoles(roles: Tipo[], userRoles: Tipo[]): boolean {
    return !!userRoles.filter((role) => roles.includes(role)).length;
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Tipo[]>('roles', context.getHandler());
    if (!roles.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    return this.matchRoles(roles, request.user.roles);
  }
}
