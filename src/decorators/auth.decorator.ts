import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RolesGuard } from '../_adapters/auth/guards';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TOKEN_NAME } from '../config/swagger.config';
import { TipoUsuario } from '../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';

export const Roles = (...roles: TipoUsuario[]) => SetMetadata('roles', roles);

export function Auth(...roles: TipoUsuario[]) {
  return applyDecorators(
    Roles(...roles),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(TOKEN_NAME),
    ApiUnauthorizedResponse({ description: 'Usuário precisa estar logado' }),
    ApiForbiddenResponse({ description: 'Usuário não tem permissão' }),
  );
}
