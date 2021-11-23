import {
  DateUnit,
  IDateAdd,
  IDateEndOf,
  IDateStartOf,
} from '../services/date-time.service';
import { IBuscarUsuarioViaId } from '../../usuarios/casos-de-uso/buscar-usuario.id.feat';
import { TipoUsuario } from '../../usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { SlotAgenda } from '../entidades/slot-agenda.entity';
import {
  CriarSlotAgendaService,
  RecuperaSlotsAgendaService,
} from '../services/agenda.service';
import { UsuarioNaoEncontradoError } from '../../usuarios/erros/usuarios.errors';

export type CriarSlotInput = {
  voluntario: number;
  slots: Pick<SlotAgenda, 'inicio'>[];
};

export class UsuarioNaoAtendente extends Error {
  code = 422;
  message = 'Usuário precisa ser atendente.';
}

export class CriarNovoSlotDeAgenda {
  constructor(
    private readonly agendaService: CriarSlotAgendaService &
      RecuperaSlotsAgendaService,
    private readonly dateHelper: IDateAdd & IDateStartOf & IDateEndOf,
    private readonly usuarioService: IBuscarUsuarioViaId,
  ) {}

  async execute({ voluntario, slots }: CriarSlotInput) {
    const usuario = await this.usuarioService.findById(voluntario);
    if (!usuario) {
      throw new UsuarioNaoEncontradoError();
    }

    if (usuario.tipo !== TipoUsuario.ATENDENTE) {
      throw new UsuarioNaoAtendente();
    }

    for (const slot of slots) {
      const { inicio } = slot;
      const fim = this.dateHelper.add(inicio, 1, DateUnit.HOURS);
      if (!(await this.verificarConflitoSlot(inicio, fim, voluntario))) {
        await this.agendaService.cadastrar({
          inicio,
          fim,
          atendenteId: voluntario,
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
      atendenteId,
      inicio: this.dateHelper.startOf(horarioInicio),
      fim: this.dateHelper.endOf(horarioFim),
    });
    return slotsNaAgenda.some(
      ({ inicio, fim }) => inicio < horarioFim && fim > horarioInicio,
    );
  }
}
