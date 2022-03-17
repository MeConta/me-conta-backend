import { SlotAgenda } from '../entidades/slot-agenda.entity';
import { VoluntarioNaoEncontradoError } from '../../admin/casos-de-uso/autorizar-voluntario.feat';
import { createMock } from '@golevelup/ts-jest';
import { Voluntario } from '../../voluntarios/entidades/voluntario.entity';
import * as dayjs from 'dayjs';
import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { TipoUsuario } from '../../usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import {
  RemoverSlotAgenda,
  SlotAgendaNaoEncontradoError,
  SlotNaoPertenceAoVoluntarioError,
  SlotNoPassadoError,
} from './remover-slot-agenda.feat';
import {
  IBuscarSlotAgendaByIdService,
  IRemoverSlotAgendaService,
} from '../services/agenda.service';
import { IDateGreaterThan } from '../services/date-time.service';

class InMemoryAgendaService
  implements IRemoverSlotAgendaService, IBuscarSlotAgendaByIdService
{
  constructor(
    public slots: SlotAgenda[] = [
      {
        id: 1,
        inicio: dayjs().add(1, 'day').toDate(),
        fim: dayjs().add(1, 'day').add(1, 'hours').toDate(),
        voluntario: Promise.resolve({
          ...createMock<Voluntario>(),
          aprovado: true,
          id: 1,
          usuario: {
            ...createMock<Usuario>(),
            id: 1,
            tipo: TipoUsuario.ATENDENTE,
          },
        }),
      },
    ],
  ) {}
  findById(id: number): Promise<SlotAgenda> {
    const [slot] = this.slots.filter((item) => item.id === id);
    return Promise.resolve(slot);
  }

  removerSlot(id: number): Promise<void> {
    const index = this.slots.findIndex((slot) => slot.id === id);
    this.slots.splice(index, 1);
    return Promise.resolve();
  }
}

class InMemoryDateHelper implements IDateGreaterThan {
  greaterThan(date: Date, than: Date): boolean {
    return dayjs(date).isAfter(dayjs(than));
  }
}

describe('Remover um slot de agenda', () => {
  let sut: RemoverSlotAgenda;
  let agendaService: InMemoryAgendaService;
  const dateHelper = new InMemoryDateHelper();

  beforeEach(() => {
    agendaService = new InMemoryAgendaService();
    sut = new RemoverSlotAgenda(agendaService, dateHelper);
  });

  it('Deve ser definido', async () => {
    expect(sut).toBeDefined();
  });

  it('Deve remover um slot', async () => {
    await sut.execute(1, 1);
    expect(agendaService.slots).toHaveLength(0);
  });

  it('Deve dar erro de Slot não encontrado', async () => {
    await expect(() => sut.execute(999, 1)).rejects.toThrow(
      SlotAgendaNaoEncontradoError,
    );
  });

  it('Deve dar erro de voluntário não encontrado caso ele não esteja aprovado', async () => {
    agendaService.slots.forEach((slot) => {
      slot.voluntario = Promise.resolve({
        ...createMock<Voluntario>(),
        aprovado: false,
      });
      return slot;
    });
    await expect(() => sut.execute(1, 1)).rejects.toThrow(
      VoluntarioNaoEncontradoError,
    );
  });

  it('Deve dar erro de voluntário slot não pertencente ao voluntário', async () => {
    await expect(() => sut.execute(1, 2)).rejects.toThrow(
      SlotNaoPertenceAoVoluntarioError,
    );
  });

  it('Deve dar erro ao tentar remover slot no passado', async () => {
    agendaService.slots[0].inicio = dayjs().subtract(1, 'years').toDate();
    agendaService.slots[0].fim = dayjs()
      .subtract(1, 'years')
      .add(1, 'hours')
      .toDate();
    await expect(() => sut.execute(1, 1)).rejects.toThrow(SlotNoPassadoError);
  });
});
