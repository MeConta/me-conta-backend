import { SlotAgenda } from '../entidades/slot-agenda.entity';
import { VoluntarioNaoEncontradoError } from '../../admin/casos-de-uso/autorizar-voluntario.feat';
import { createMock } from '@golevelup/ts-jest';
import { Voluntario } from '../../voluntarios/entidades/voluntario.entity';
import * as moment from 'moment';
import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { TipoUsuario } from '../../usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { RemoverSlotAgenda } from './remover-slot-agenda.feat';
import {
  IBuscarSlotAgendaByIdService,
  IRemoverSlotAgendaService,
} from '../services/agenda.service';

class InMemoryAgendaService
  implements IRemoverSlotAgendaService, IBuscarSlotAgendaByIdService
{
  constructor(
    public slots: SlotAgenda[] = [
      {
        id: 1,
        inicio: moment().toDate(),
        fim: moment().add(1, 'hours').toDate(),
        voluntario: Promise.resolve({
          ...createMock<Voluntario>(),
          aprovado: true,
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
    const [slot] = this.slots.filter((slot) => slot.id === id);
    return Promise.resolve(slot);
  }

  removerSlot(id: number): Promise<void> {
    const index = this.slots.findIndex((slot) => slot.id === id);
    this.slots.splice(index, 1);
    return Promise.resolve();
  }
}

describe('Remover um slot de agenda', () => {
  let sut: RemoverSlotAgenda;
  let agendaService: InMemoryAgendaService;

  beforeEach(() => {
    agendaService = new InMemoryAgendaService();
    sut = new RemoverSlotAgenda(agendaService);
  });

  it('Deve ser definido', async () => {
    expect(sut).toBeDefined();
  });

  it('Deve remover um slot', async () => {
    await sut.execute(1);
    expect(agendaService.slots).toHaveLength(0);
  });

  it('Deve dar erro de voluntário não encontrado caso ele não esteja aprovado', async () => {
    agendaService.slots.map((slot) => {
      slot.voluntario = Promise.resolve({
        ...createMock<Voluntario>(),
        aprovado: false,
      });
      return slot;
    });
    await expect(() => sut.execute(1)).rejects.toThrow(
      VoluntarioNaoEncontradoError,
    );
  });
});
