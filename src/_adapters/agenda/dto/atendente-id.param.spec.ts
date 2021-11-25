import { plainToClass } from 'class-transformer';
import { AtendenteIdParam } from './atendente-id.param.dto';

describe('TipoUsuarioParam', () => {
  let transformed: AtendenteIdParam;

  beforeEach(() => {
    transformed = plainToClass(AtendenteIdParam, {
      id: '1',
    });
  });

  it('Deve ser Capaz de converter o tipo', async () => {
    expect(transformed.id).toBe(1);
  });
});
