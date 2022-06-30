import {
  AtualizarSlotDeAgenda,
  SlotComMenosDe24HorasError,
  SlotNaAgendaNaoEncontrado,
  SlotOcupadoError,
} from './atualizar-slot-agenda.feat';

import {
  IAtualizaSlotAgendaService,
  IBuscarSlotAgendaByIdService,
  RecuperaSlotsAgendaService,
  SlotAgendaParam,
} from '../services/agenda.service';
import { SlotAgenda } from '../entidades/slot-agenda.entity';
import * as dayjs from 'dayjs';
import {
  DateUnit,
  IDateAdd,
  IDateEndOf,
  IDateGreaterThan,
  IDateStartOf,
} from '../services/date-time.service';
import { createMock } from '@golevelup/ts-jest';
import { Voluntario } from '../../../_business/voluntarios/entidades/voluntario.entity';

class InMemoryAgendaService
  implements
    IAtualizaSlotAgendaService,
    IBuscarSlotAgendaByIdService,
    RecuperaSlotsAgendaService
{
  public slots: SlotAgenda[] = [];
  constructor() {
    this.makeSlotsMock();
  }

  private makeSlotsMock(): void {
    this.slots = [
      createMock<SlotAgenda>({
        id: 16,
        inicio: dayjs().add(4, 'day').toDate(),
        fim: dayjs().add(97, 'hour').toDate(),
        voluntario: Promise.resolve(
          createMock({
            id: 1,
            ...createMock<Promise<Voluntario>>(),
          }),
        ),
      }),
      createMock<SlotAgenda>({
        id: 12,
        ...createMock<SlotAgenda>(),
        voluntario: Promise.resolve(
          createMock({ id: 1, ...createMock<Promise<Voluntario>>() }),
        ),
      }),
      createMock<SlotAgenda>({
        id: 13,
        inicio: dayjs().add(2, 'day').toDate(),
        fim: dayjs().add(49, 'hour').toDate(),
        voluntario: Promise.resolve(
          createMock({ id: 1, ...createMock<Promise<Voluntario>>() }),
        ),
      }),
      createMock<SlotAgenda>({
        id: 15,
        inicio: dayjs().add(5, 'day').toDate(),
        fim: dayjs().add(121, 'hour').toDate(),
        voluntario: Promise.resolve(
          createMock({
            id: 1,
            ...createMock<Promise<Voluntario>>(),
          }),
        ),
      }),
    ];
  }

  async findById(id: number): Promise<SlotAgenda> {
    return this.slots.find((slot) => slot.id === id);
  }

  async atualiza(
    id: number,
    input: Omit<SlotAgendaParam, 'atendenteId'>,
  ): Promise<SlotAgenda> {
    const slotEncontrado = this.slots.find((slot) => slot.id === id);

    slotEncontrado.inicio = input.inicio;
    slotEncontrado.fim = input.fim;

    return slotEncontrado;
  }

  async recuperaSlots(param: SlotAgendaParam): Promise<SlotAgenda[]> {
    return this.slots.filter(async (slot) => {
      const { usuario } = await slot.voluntario;
      return (
        param.voluntarioId === usuario.id &&
        (slot.inicio >= param.inicio || slot.fim <= param.fim)
      );
    });
  }
}

class InMemoryDatetimeService
  implements IDateAdd, IDateGreaterThan, IDateStartOf, IDateEndOf
{
  add(date: Date, amount: number, unit?: DateUnit): Date {
    return dayjs(date).add(amount, unit).toDate();
  }

  greaterThan(date: Date, than: Date): boolean {
    return dayjs(date).isAfter(than);
  }

  endOf(date: Date, unit: DateUnit = DateUnit.DAYS): Date {
    return dayjs(date).endOf(unit).toDate();
  }

  startOf(date: Date, unit: DateUnit = DateUnit.DAYS): Date {
    return dayjs(date).startOf(unit).toDate();
  }
}

describe('atualizar slot na agenda', () => {
  let agendaService: InMemoryAgendaService;
  const dateTimeUtils = new InMemoryDatetimeService();
  let sut: AtualizarSlotDeAgenda;

  beforeEach(() => {
    agendaService = new InMemoryAgendaService();
    sut = new AtualizarSlotDeAgenda(agendaService, dateTimeUtils);
  });

  // TODO: Teste para atualizar slot pelo id
  // it('deve atualizar slot com data e hora de inicio e fim uma hora depois do inicio com id do slot', async () => {
  //   const request = {
  //     id: 16,
  //     slot: {
  //       inicio: dateTimeUtils.add(
  //         agendaService.slots[0].inicio,
  //         3,
  //         DateUnit.DAYS,
  //       ),
  //     },
  //   };

  //   await sut.execute(request);

  //   expect(agendaService.slots[0]).toEqual(
  //     expect.objectContaining({
  //       inicio: request.slot.inicio,
  //       fim: dayjs(request.slot.inicio).add(1, 'hour').toDate(),
  //     } as SlotAgenda),
  //   );
  // });

  it('Não deve criar um novo slot caso o slot tenha sido marcado para o dia', async () => {
    const request = {
      id: 12,
      slot: {
        inicio: dateTimeUtils.add(
          agendaService.slots[1].inicio,
          2,
          DateUnit.DAYS,
        ),
      },
    };

    await expect(sut.execute(request)).rejects.toThrow(
      SlotComMenosDe24HorasError,
    );
  });

  it('Deve dar erro de slot não encontrado caso o slot não exista', async () => {
    jest.spyOn(agendaService, 'findById').mockResolvedValue(null);
    await expect(
      sut.execute({
        id: expect.any(Number),
        slot: {
          inicio: dayjs().toDate(),
        },
      }),
    ).rejects.toThrow(SlotNaAgendaNaoEncontrado);
  });

  it('deve dar erro se o slot atualizado conflitar com outro já existente', async () => {
    await expect(
      sut.execute({
        id: 13,
        slot: {
          inicio: dateTimeUtils.add(
            agendaService.slots[2].inicio,
            3,
            DateUnit.DAYS,
          ),
        },
      }),
    ).rejects.toBeInstanceOf(SlotOcupadoError);
  });
});
