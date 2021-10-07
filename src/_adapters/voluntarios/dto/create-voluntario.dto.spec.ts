import { plainToClass } from 'class-transformer';
import { CreateVoluntarioDto } from './create-voluntario.dto';

describe('CreateVoluntarioDto', () => {
  it('Deve converter a data em um Dto de Voluntário', () => {
    const transformed = plainToClass(CreateVoluntarioDto, {
      dataNascimento: '2021-01-01',
    });
    expect(transformed).toEqual(
      expect.objectContaining({
        dataNascimento: expect.any(Date),
      }),
    );
  });
});
