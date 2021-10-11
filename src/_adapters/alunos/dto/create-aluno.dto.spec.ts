import { plainToClass } from 'class-transformer';
import { CreateAlunoDto } from './create-aluno.dto';

describe('CreateAlunoDto', function () {
  it('Deve converter a data em um Dto de Aluno', function () {
    const transformed = plainToClass(CreateAlunoDto, {
      dataNascimento: '1996-07-12',
    });
    expect(transformed).toEqual(
      expect.objectContaining({
        dataNascimento: expect.any(Date),
      } as CreateAlunoDto),
    );
  });
});
