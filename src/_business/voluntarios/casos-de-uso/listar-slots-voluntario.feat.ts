import { IBuscarVoluntarios } from '../services/voluntario.service';
import { VoluntarioNaoEncontradoError } from '../../admin/casos-de-uso/autorizar-voluntario.feat';
import { TipoUsuario } from '../../usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { SlotAgenda } from 'src/_business/agenda/entidades/slot-agenda.entity';

export class ListarSlotsVoluntario {
  constructor(private readonly voluntarioService: IBuscarVoluntarios) {}

  async execute(atendenteId?: number, dataSlot?: Date): Promise<SlotAgenda[]> {
    const search = {
      aprovado: true,
      usuario: {
        tipo: TipoUsuario.ATENDENTE,
      } as Usuario,
    };
    if (atendenteId) {
      search.usuario.id = atendenteId;
    }
    const voluntarios = await this.voluntarioService.buscar(search);
    if (atendenteId && !voluntarios.length) {
      throw new VoluntarioNaoEncontradoError();
    }

    const voluntario = voluntarios[0];

    function filtrarSlotsSelectedbyDate(slots) {
      const availableVolunteerDateSlots = slots.inicio
        .toLocaleString('pt-BR', { timeZone: 'UTC' })
        .substring(0, 10);
      const selectedDateSlot = dataSlot
        .toLocaleString('pt-BR', { timeZone: 'UTC' })
        .substring(0, 10);
      return selectedDateSlot === availableVolunteerDateSlots;
    }

    function filtrarSlots(slots) {
      return slots.inicio > Date.now();
    }

    if (dataSlot) {
      return voluntario.slots.filter(filtrarSlotsSelectedbyDate);
    }
    return voluntario.slots.filter(filtrarSlots);
  }
}
