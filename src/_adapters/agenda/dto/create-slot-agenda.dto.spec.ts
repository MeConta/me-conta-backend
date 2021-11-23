import { plainToClass } from 'class-transformer';
import { CreateSlotAgendaDto } from './create-slot-agenda.dto';
import * as moment from 'moment';

describe('CreateAlunoDto', function () {
  it('Deve converter a data em um Dto de Aluno', function () {
    const transformed = plainToClass(CreateSlotAgendaDto, {
      slots: [{ inicio: moment().format('YYYY-MM-DD HH:mm:ss') }],
    });
    expect(transformed).toEqual(
      expect.objectContaining({
        slots: [
          {
            inicio: expect.any(Date),
          },
        ],
      } as CreateSlotAgendaDto),
    );
  });
});
