import { RolesGuard } from './roles.guard';
import { ExecutionContext } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';
import { Reflector } from '@nestjs/core';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';

describe('RolesGuard', () => {
  const reflector = createMock<Reflector>();
  const mockContext = createMock<ExecutionContext>();
  let guard: RolesGuard;

  beforeEach(() => {
    guard = new RolesGuard(reflector);
  });

  it('deve ser definido', () => {
    expect(guard).toBeDefined();
  });

  it('Deve poder ativar uma rota quando há a role aceita', () => {
    mockContext.switchToHttp().getRequest.mockReturnValue({
      user: {
        roles: [TipoUsuario.ADMINISTRADOR],
        id: 1,
      },
    });

    reflector.get
      .mockReturnValueOnce([TipoUsuario.ADMINISTRADOR])
      .mockReturnValue(null);

    expect(guard.canActivate(mockContext)).toBeTruthy();
  });

  it('Deve poder ativar uma rota que não pede role', () => {
    reflector.get.mockReturnValueOnce([]).mockReturnValue(null);

    expect(guard.canActivate(mockContext)).toBeTruthy();
  });

  it('Deve poder ativar uma rota que pede role e AuthParam', () => {
    reflector.get
      .mockReturnValueOnce([TipoUsuario.ALUNO])
      .mockReturnValue('id');

    mockContext.switchToHttp().getRequest.mockReturnValue({
      user: {
        roles: [TipoUsuario.ALUNO],
        id: 1,
      },
      params: {
        id: 1,
      },
    });

    expect(guard.canActivate(mockContext)).toBeTruthy();
  });

  it('Não Deve poder ativar uma rota que pede role e AuthParam', () => {
    reflector.get
      .mockReturnValueOnce([TipoUsuario.ALUNO])
      .mockReturnValue('id');

    mockContext.switchToHttp().getRequest.mockReturnValue({
      user: {
        roles: [TipoUsuario.ALUNO],
        id: 1,
      },
      params: {
        id: 2,
      },
    });

    expect(guard.canActivate(mockContext)).toBeFalsy();
  });

  afterEach(async () => {
    reflector.get.mockClear();
    mockContext.switchToHttp().getRequest.mockClear();
  });
});
