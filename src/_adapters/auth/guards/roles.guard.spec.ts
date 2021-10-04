import { RolesGuard } from './roles.guard';
import { ExecutionContext } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';
import { Reflector } from '@nestjs/core';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';

describe('RolesGuard', () => {
  const reflector = createMock<Reflector>();
  const mockContext = createMock<ExecutionContext>();
  let guard: RolesGuard;

  it('deve ser definido', () => {
    reflector.get.mockReturnValue([TipoUsuario.ADMINISTRADOR]);
    guard = new RolesGuard(reflector);
    expect(guard).toBeDefined();
  });

  it('Deve poder ativar uma rota quando há a role aceita', () => {
    const mockContext = createMock<ExecutionContext>();
    mockContext.switchToHttp().getRequest.mockReturnValue({
      user: {
        roles: [TipoUsuario.ADMINISTRADOR],
      },
    });

    reflector.get.mockReturnValue([TipoUsuario.ADMINISTRADOR]);
    guard = new RolesGuard(reflector);

    expect(guard.canActivate(mockContext)).toBeTruthy();
  });

  it('Deve poder ativar uma rota que não pede role', () => {
    reflector.get.mockReturnValue([]);
    guard = new RolesGuard(reflector);

    expect(guard.canActivate(mockContext)).toBeTruthy();
  });
});
