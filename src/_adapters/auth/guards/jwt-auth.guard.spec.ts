import { OptionalJwtAuthGuard } from './jwt-auth.guard';
import { createMock } from '@golevelup/ts-jest';
import { ITokenUser } from '../../../_business/auth/interfaces/auth';

describe('Jwt Auth', () => {
  let guard: OptionalJwtAuthGuard;
  beforeEach(() => {
    guard = new OptionalJwtAuthGuard();
  });
  it('Deve ser definido', () => {
    expect(guard).toBeDefined();
  });
  describe('Optional Jwt Auth', () => {
    it('Deve retornar um usuário', async () => {
      const response = guard.handleRequest(null, createMock<ITokenUser>());
      expect(response).toBeDefined();
    });
    it('Deve retornar null quando não há usuário', async () => {
      const response = guard.handleRequest(null, null);
      expect(response).toBeNull();
    });
  });
});
