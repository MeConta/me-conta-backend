import {
  CriarNovoSlotDeAgenda,
  UsuarioNaoAtendenteError,
  VoluntarioNaoAprovadoError,
} from './criar-novo-slot-de-agenda.feat';

import { createMock } from '@golevelup/ts-jest';
import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { TipoUsuario } from '../../usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import {
  CriarSlotAgendaService,
  RecuperaSlotsAgendaService,
  SlotAgendaParam,
} from '../services/agenda.service';
import { SlotAgenda } from '../entidades/slot-agenda.entity';
import * as moment from 'moment';
import { UsuarioNaoEncontradoError } from '../../usuarios/erros/usuarios.errors';
import {
  DateUnit,
  IDateAdd,
  IDateEndOf,
  IDateStartOf,
} from '../services/date-time.service';
import { Voluntario } from '../../voluntarios/entidades/voluntario.entity';
import { IBuscarVoluntarioViaId } from '../../voluntarios/services/voluntario.service';

class InMemoryAgendaService
  implements CriarSlotAgendaService, RecuperaSlotsAgendaService
{
  constructor(public slots: SlotAgenda[] = []) {}

  async cadastrar({
    inicio,
    fim,
    atendenteId,
  }: SlotAgendaParam): Promise<void> {
    this.slots.push({
      id: this.slots.length,
      inicio,
      fim,
      voluntario: Promise.resolve({
        usuario: {
          id: atendenteId,
        },
      } as Voluntario),
    });
  }

  async recuperaSlots(param: SlotAgendaParam): Promise<SlotAgenda[]> {
    return this.slots.filter(async (slot) => {
      const { usuario } = await slot.voluntario;
      return (
        param.atendenteId === usuario.id &&
        (slot.inicio >= param.inicio || slot.fim <= param.fim)
      );
    });
  }
}

class InMemoryDatetimeService implements IDateAdd, IDateStartOf, IDateEndOf {
  add(date: Date, amount: number, unit?: DateUnit): Date {
    return moment(date).add(amount, unit).toDate();
  }

  endOf(date: Date, unit: DateUnit = DateUnit.DAYS): Date {
    return moment(date).endOf(unit).toDate();
  }

  startOf(date: Date, unit: DateUnit = DateUnit.DAYS): Date {
    return moment(date).startOf(unit).toDate();
  }
}

describe('criar novo slot na agenda', () => {
  let agendaService: InMemoryAgendaService;
  const voluntarioService = createMock<IBuscarVoluntarioViaId>();
  const dateTimeUtils = new InMemoryDatetimeService();
  let sut: CriarNovoSlotDeAgenda;

  const request = {
    voluntarioId: expect.any(Number),
    slots: [
      {
        inicio: moment().toDate(),
      },
    ],
  };

  beforeEach(() => {
    agendaService = new InMemoryAgendaService();
    sut = new CriarNovoSlotDeAgenda(
      agendaService,
      dateTimeUtils,
      voluntarioService,
    );
  });

  beforeEach(async () => {
    jest.spyOn(voluntarioService, 'findById').mockResolvedValue({
      ...createMock<Voluntario>(),
      aprovado: true,
      usuario: {
        ...createMock<Usuario>(),
        tipo: TipoUsuario.ATENDENTE,
      },
    });
  });

  it('deve criar slot com data e hora de inicio e fim uma hora depois do inicio, e id da pessoa atendente', async () => {
    await sut.execute(request);
    const [slot] = request.slots;
    expect(agendaService.slots).toContainEqual(
      expect.objectContaining({
        inicio: slot.inicio,
        fim: moment(slot.inicio).add(1, 'hour').toDate(),
      }),
    );
  });

  it('Não deve criar um novo slot caso exista conflito de slots', async () => {
    await sut.execute(request);
    await sut.execute(request);
    expect(agendaService.slots).toHaveLength(1);
  });

  it('Deve dar erro de usuário não encontrado caso o usuário não exista', async () => {
    jest.spyOn(voluntarioService, 'findById').mockResolvedValue(null);
    await expect(
      sut.execute({
        voluntarioId: expect.any(Number),
        slots: [
          {
            inicio: moment().toDate(),
          },
        ],
      }),
    ).rejects.toThrow(UsuarioNaoEncontradoError);
  });

  it('deve rejeitar se usuario não for atendente', async () => {
    jest.spyOn(voluntarioService, 'findById').mockResolvedValue({
      ...createMock<Voluntario>(),
      usuario: {
        ...createMock<Usuario>(),
        tipo: TipoUsuario.ALUNO,
      },
    });
    await expect(
      sut.execute({
        voluntarioId: expect.any(Number),
        slots: [
          {
            inicio: expect.any(Date),
          },
        ],
      }),
    ).rejects.toBeInstanceOf(UsuarioNaoAtendenteError);
  });

  it('deve rejeitar se usuario não for atendente aprovado', async () => {
    jest.spyOn(voluntarioService, 'findById').mockResolvedValue({
      ...createMock<Voluntario>(),
      aprovado: false,
      usuario: {
        ...createMock<Usuario>(),
        tipo: TipoUsuario.ATENDENTE,
      },
    });
    await expect(
      sut.execute({
        voluntarioId: expect.any(Number),
        slots: [
          {
            inicio: expect.any(Date),
          },
        ],
      }),
    ).rejects.toBeInstanceOf(VoluntarioNaoAprovadoError);
  });
});
