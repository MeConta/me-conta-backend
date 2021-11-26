import { plainToClass } from 'class-transformer';
import { IdParam } from './id.param.dto';

describe('TipoUsuarioParam', () => {
  let transformed: IdParam;

  beforeEach(() => {
    transformed = plainToClass(IdParam, {
      id: '1',
    });
  });

  it('Deve ser Capaz de converter o tipo', async () => {
    expect(transformed.id).toBe(1);
  });
});
