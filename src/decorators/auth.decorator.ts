import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { TOKEN_NAME } from '../config/swagger.config';

export function Auth() {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(TOKEN_NAME),
    ApiUnauthorizedResponse({ description: 'Usuário precisa estar logado' }),
  );
}
