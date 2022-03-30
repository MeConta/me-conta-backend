import { plainToClass } from 'class-transformer';
import { CreateAtendimentoDto } from './create-atendimento.dto';

describe('CreateAlunoDto', function () {
  it('Deve converter a data em um Dto de Aluno', function () {
    const transformed = plainToClass(CreateAtendimentoDto, {
      dataCriacao: '1996-07-12',
    });
    expect(transformed).toEqual(
      expect.objectContaining({
        dataCriacao: expect.any(Date),
      } as CreateAtendimentoDto),
    );
  });
});
