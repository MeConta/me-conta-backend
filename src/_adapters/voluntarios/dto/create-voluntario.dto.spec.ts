import { plainToClass } from 'class-transformer';
import { CreateVoluntarioDto } from './create-voluntario.dto';

describe('CreateUsuarioDto', () => {
  it('should ', () => {
    const transformed = plainToClass(CreateVoluntarioDto, {
      usuario: 1,
      dataNascimento: '2021-01-01',
    });
    expect(transformed).toEqual(
      expect.objectContaining({
        usuario: {
          id: 1,
        },
        dataNascimento: expect.any(Date),
      }),
    );
  });
});
