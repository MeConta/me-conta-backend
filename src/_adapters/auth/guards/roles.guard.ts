import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  private matchRoles(
    roles: TipoUsuario[],
    userRoles: TipoUsuario[],
    id?: number,
    solicitedId?: number,
  ): boolean {
    if (solicitedId && !userRoles.includes(TipoUsuario.ADMINISTRADOR)) {
      return id === solicitedId;
    }
    return !!userRoles.filter((role) => roles.includes(role)).length;
  }

  canActivate(context: ExecutionContext): boolean {
    const { get } = this.reflector;

    const endpointRoles = get<TipoUsuario[]>('roles', context.getHandler());
    if (!endpointRoles.length) {
      return true;
    }

    const authParam = get<string>('authParam', context.getHandler());

    const request = context.switchToHttp().getRequest();
    const { id, roles } = request.user;
    const solicitedId = !!authParam ? request.params[authParam] : null;
    return this.matchRoles(endpointRoles, roles, id, +solicitedId);
  }
}
