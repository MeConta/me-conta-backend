import { JwtRefreshGuard } from './jwt-refresh.guard';

describe('Jwt Refresh', () => {
  let guard: JwtRefreshGuard;
  beforeEach(() => {
    guard = new JwtRefreshGuard();
  });
  it('Deve ser definido', () => {
    expect(guard).toBeDefined();
  });
});
