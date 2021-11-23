import {
  CriarNovoSlotDeAgenda,
  UsuarioNaoAtendente,
} from './criar-novo-slot-de-agenda.feat';

import { createMock } from '@golevelup/ts-jest';
import { IBuscarUsuarioViaId } from '../../usuarios/casos-de-uso/buscar-usuario.id.feat';
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
      voluntario: {
        usuario: {
          id: atendenteId,
        },
      } as Voluntario,
    });
  }

  async recuperaSlots(param: SlotAgendaParam): Promise<SlotAgenda[]> {
    return this.slots.filter((slot) => {
      return (
        param.atendenteId === slot.voluntario.usuario.id &&
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
  const usuarioService = createMock<IBuscarUsuarioViaId>();
  const dateTimeUtils = new InMemoryDatetimeService();
  let sut: CriarNovoSlotDeAgenda;
  beforeEach(() => {
    agendaService = new InMemoryAgendaService();
    sut = new CriarNovoSlotDeAgenda(
      agendaService,
      dateTimeUtils,
      usuarioService,
    );
  });

  beforeEach(async () => {
    jest.spyOn(usuarioService, 'findById').mockResolvedValue({
      ...createMock<Usuario>(),
      tipo: TipoUsuario.ATENDENTE,
    });
  });

  it('deve criar slot com data e hora de inicio e fim uma hora depois do inicio, e id da pessoa atendente', async () => {
    const date = moment().toDate();
    await sut.execute({
      voluntario: 1,
      slots: [
        {
          inicio: date,
        },
      ],
    });
    expect(agendaService.slots).toContainEqual({
      id: expect.any(Number),
      inicio: date,
      fim: moment(date).add(1, 'hour').toDate(),
      idAtendente: 1,
    });
  });
  it('Deve dar erro de usuário não encontrado caso o usuário não exista', async () => {
    jest.spyOn(usuarioService, 'findById').mockResolvedValue(null);
    await expect(
      sut.execute({
        voluntario: expect.any(Number),
        slots: [
          {
            inicio: moment().toDate(),
          },
        ],
      }),
    ).rejects.toThrow(UsuarioNaoEncontradoError);
  });
  it('deve rejeitar se usuario nao for atendente', async () => {
    jest.spyOn(usuarioService, 'findById').mockResolvedValue({
      ...createMock<Usuario>(),
      tipo: TipoUsuario.ALUNO,
    });
    await expect(
      sut.execute({
        voluntario: expect.any(Number),
        slots: [
          {
            inicio: expect.any(Date),
          },
        ],
      }),
    ).rejects.toBeInstanceOf(UsuarioNaoAtendente);
  });
});
