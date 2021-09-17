import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TOKEN_NAME } from '../config/swagger.config';
import { Tipo } from '../usuario/entities/usuario.enum';
import { Roles } from './roles.decorator';

export function Auth(...roles: Tipo[]) {
  return applyDecorators(
    Roles(...roles),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(TOKEN_NAME),
    ApiUnauthorizedResponse({ description: 'Usuário precisa estar logado' }),
    ApiForbiddenResponse({ description: 'Usuário não tem permissão' }),
  );
}
