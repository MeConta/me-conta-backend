import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Tipo } from '../../usuario/entities/usuario.enum';

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

    return this.matchRoles(roles, request.user.roles);
  }
}
