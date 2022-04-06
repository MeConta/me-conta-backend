import { plainToClass } from 'class-transformer';
import { AtualizarSlotAgendaDto } from './atualizar-slot-agenda.dto';
import * as dayjs from 'dayjs';

describe('AtualizaSlotDto', function () {
  it('Deve converter a data em um Dto de atualizar slot', function () {
    const transformed = plainToClass(AtualizarSlotAgendaDto, {
      id: 1,
      slot: { inicio: dayjs().format('YYYY-MM-DD HH:mm:ss') },
    });
    expect(transformed).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        slot: {
          inicio: expect.any(Date),
        },
      } as AtualizarSlotAgendaDto),
    );
  });
});
