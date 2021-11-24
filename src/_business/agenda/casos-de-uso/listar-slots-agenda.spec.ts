import {
  RecuperaSlotsAgendaService,
  SlotAgendaParam,
} from '../services/agenda.service';
import { SlotAgenda } from '../entidades/slot-agenda.entity';
import { Voluntario } from '../../voluntarios/entidades/voluntario.entity';
import { createMock } from '@golevelup/ts-jest';
import { Usuario } from '../../usuarios/entidades/usuario.entity';
import * as moment from 'moment';
import { IBuscarVoluntarioViaId } from '../../voluntarios/services/voluntario.service';
import { VoluntarioNaoEncontradoError } from '../../admin/casos-de-uso/autorizar-voluntario.feat';
import { TipoUsuario } from '../../usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { UsuarioNaoAtendenteError } from './criar-novo-slot-de-agenda.feat';

class ListarSlotsAgenda {
  constructor(
    private readonly voluntarioService: IBuscarVoluntarioViaId,
    private readonly agendaService: RecuperaSlotsAgendaService,
  ) {}
  async execute(atendenteId: number) {
    const voluntario = await this.voluntarioService.findById(atendenteId);
    if (!voluntario) {
      throw new VoluntarioNaoEncontradoError();
    }
    if (voluntario.usuario.tipo !== TipoUsuario.ATENDENTE) {
      throw new UsuarioNaoAtendenteError();
    }
    return this.agendaService.recuperaSlots({
      atendenteId,
    });
  }
}

class InMemoryAgendaService implements RecuperaSlotsAgendaService {
  constructor(public slots: SlotAgenda[] = []) {}
  async recuperaSlots(param?: Partial<SlotAgendaParam>): Promise<SlotAgenda[]> {
    return this.slots.filter(
      (slot) => slot.voluntario.usuario.id == param.atendenteId,
    );
  }
}

describe('Listar Slots de Agenda', () => {
  let sut: ListarSlotsAgenda;
  const voluntarioService = createMock<IBuscarVoluntarioViaId>();
  const agendaService = new InMemoryAgendaService();
  beforeEach(async () => {
    sut = new ListarSlotsAgenda(voluntarioService, agendaService);
  });
  beforeEach(async () => {
    jest.spyOn(voluntarioService, 'findById').mockResolvedValue({
      ...createMock<Voluntario>(),
      usuario: {
        ...createMock<Usuario>(),
        tipo: TipoUsuario.ATENDENTE,
        id: 1,
      },
    });
  });
  beforeEach(async () => {
    agendaService.slots.push({
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
    });
  });

  it('Deve ser definido', async () => {
    expect(sut).toBeDefined();
  });
  it('Deve listar os slots de um atendente', async () => {
    const response = await sut.execute(1);
    expect(response).toHaveLength(1);
  });

  it('Deve dar erro de voluntario não encontrado', async () => {
    jest.spyOn(voluntarioService, 'findById').mockResolvedValue(null);
    await expect(() => sut.execute(1)).rejects.toThrow(
      VoluntarioNaoEncontradoError,
    );
  });
  it('Deve dar erro de voluntario não atendente', async () => {
    jest.spyOn(voluntarioService, 'findById').mockResolvedValue({
      ...createMock<Voluntario>(),
      usuario: {
        ...createMock<Usuario>(),
        tipo: TipoUsuario.SUPERVISOR,
      },
    });
    await expect(() => sut.execute(1)).rejects.toThrow(
      UsuarioNaoAtendenteError,
    );
  });
});
