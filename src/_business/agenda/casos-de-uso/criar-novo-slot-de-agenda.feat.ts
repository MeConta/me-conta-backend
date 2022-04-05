import {
  DateUnit,
  IDateAdd,
  IDateEndOf,
  IDateStartOf,
} from '../services/date-time.service';
import { TipoUsuario } from '../../usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { SlotAgenda } from '../entidades/slot-agenda.entity';
import {
  CriarSlotAgendaService,
  RecuperaSlotsAgendaService,
} from '../services/agenda.service';
import { UsuarioNaoEncontradoError } from '../../usuarios/erros/usuarios.errors';
import { IBuscarVoluntarioViaId } from '../../voluntarios/services/voluntario.service';

export type CriarSlotInput = {
  voluntarioId: number;
  slots: Pick<SlotAgenda, 'inicio'>[];
};

export class UsuarioNaoAtendenteError extends Error {
  code = 422;
  message = 'Usuário precisa ser atendente.';
}

export class VoluntarioNaoAprovadoError extends Error {
  code = 403;
  message = 'O Voluntário não foi aprovado';
}

export class CriarNovoSlotDeAgenda {
  constructor(
    private readonly agendaService: CriarSlotAgendaService &
      RecuperaSlotsAgendaService,
    private readonly dateHelper: IDateAdd & IDateStartOf & IDateEndOf,
    private readonly voluntarioService: IBuscarVoluntarioViaId,
  ) {}

  async execute({ voluntarioId, slots }: CriarSlotInput) {
    const voluntario = await this.voluntarioService.findById(voluntarioId);
    if (!voluntario) {
      throw new UsuarioNaoEncontradoError();
    }

    if (voluntario.usuario.tipo !== TipoUsuario.ATENDENTE) {
      throw new UsuarioNaoAtendenteError();
    }
    if (!voluntario.aprovado) {
      throw new VoluntarioNaoAprovadoError();
    }

    for (const slot of slots) {
      const { inicio } = slot;
      const fim = this.dateHelper.add(inicio, 1, DateUnit.HOURS);
      if (!(await this.verificarConflitoSlot(inicio, fim, voluntarioId))) {
        await this.agendaService.cadastrar({
          inicio,
          fim,
          voluntarioId,
        });
      }
    }
  }

  private async verificarConflitoSlot(
    horarioInicio: Date,
    horarioFim: Date,
    atendenteId: number,
  ): Promise<boolean> {
    const slotsNaAgenda = await this.agendaService.recuperaSlots({
      voluntarioId: atendenteId,
      inicio: this.dateHelper.startOf(horarioInicio),
      fim: this.dateHelper.endOf(horarioFim),
    });
    return slotsNaAgenda.some(
      ({ inicio, fim }) => inicio < horarioFim && fim > horarioInicio,
    );
  }
}
