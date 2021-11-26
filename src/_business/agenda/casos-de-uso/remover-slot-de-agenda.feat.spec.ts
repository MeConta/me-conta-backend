import { SlotAgenda } from '../entidades/slot-agenda.entity';
import { IBuscarVoluntarioViaId } from '../../voluntarios/services/voluntario.service';
import { VoluntarioNaoEncontradoError } from '../../admin/casos-de-uso/autorizar-voluntario.feat';
import { createMock } from '@golevelup/ts-jest';
import { Voluntario } from '../../voluntarios/entidades/voluntario.entity';
import * as moment from 'moment';
import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { TipoUsuario } from '../../usuarios/casos-de-uso/cadastrar-novo-usuario.feat';

interface IRemoverSlotAgendaService {
  removerSlot(id: number): Promise<void>;
}
interface IBuscarSlotAgendaByIdService {
  findById(id: number): Promise<SlotAgenda>;
}

class SlotAgendaNaoEncontradoError extends Error {
  code = 404;
  message = 'Slot de Agenda não encontrado';
}

class RemoverSlotAgenda {
  constructor(
    private readonly agendaService: IRemoverSlotAgendaService &
      IBuscarSlotAgendaByIdService,
    private readonly voluntarioService: IBuscarVoluntarioViaId,
  ) {}
  async execute(id: number) {
    const slot = await this.agendaService.findById(id);
    if (!slot) {
      throw new SlotAgendaNaoEncontradoError();
    }
    const voluntario = await this.voluntarioService.findById(
      slot.voluntario.usuario.id,
    );
    if (!voluntario || !voluntario.aprovado) {
      throw new VoluntarioNaoEncontradoError();
    }
    return this.agendaService.removerSlot(id);
  }
}

class InMemoryAgendaService
  implements IRemoverSlotAgendaService, IBuscarSlotAgendaByIdService
{
  constructor(
    public slots: SlotAgenda[] = [
      {
        id: 1,
        inicio: moment().toDate(),
        fim: moment().add(1, 'hours').toDate(),
        voluntario: {
          ...createMock<Voluntario>(),
          usuario: {
            ...createMock<Usuario>(),
            id: 1,
            tipo: TipoUsuario.ATENDENTE,
          },
        },
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
  const voluntarioService = createMock<IBuscarVoluntarioViaId>();
  const voluntario: Voluntario = {
    ...createMock<Voluntario>(),
    usuario: {
      ...createMock<Usuario>(),
      id: 1,
    },
  };
  beforeEach(() => {
    agendaService = new InMemoryAgendaService();
    sut = new RemoverSlotAgenda(agendaService, voluntarioService);
  });
  beforeEach(async () => {
    jest.spyOn(voluntarioService, 'findById').mockResolvedValue(voluntario);
  });
  it('Deve ser definido', async () => {
    expect(sut).toBeDefined();
  });
  it('Deve remover um slot', async () => {
    await sut.execute(1);
    expect(agendaService.slots).toHaveLength(0);
  });
  it('Deve remover um slot', async () => {
    await sut.execute(1);
    expect(agendaService.slots).toHaveLength(0);
  });
  it('Deve dar erro de voluntário não encontrado caso ele não exista', async () => {
    jest.spyOn(voluntarioService, 'findById').mockResolvedValue(null);
    await expect(() => sut.execute(1)).rejects.toThrow(
      VoluntarioNaoEncontradoError,
    );
  });
  it('Deve dar erro de voluntário não encontrado caso ele não esteja aprovado', async () => {
    jest.spyOn(voluntarioService, 'findById').mockResolvedValue({
      ...voluntario,
      aprovado: false,
    });
    await expect(() => sut.execute(1)).rejects.toThrow(
      VoluntarioNaoEncontradoError,
    );
  });
});
