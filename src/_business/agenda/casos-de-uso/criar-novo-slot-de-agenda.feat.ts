import { CriarSlotAgendaService } from '../interfaces/criar-slot-agenda.service';
import {
  IDateAdd,
  IDateEndOfDay,
  IDateStartOfDay,
} from '../interfaces/date-time.service';
import { IAuthorizationService } from '../../autorizacao/services/authorization.service';
import { RecuperaSlotsAgendaService } from '../interfaces/recupera-slots-agenda.service';
import { TipoUsuario } from '../../usuarios/casos-de-uso/cadastrar-novo-usuario.feat';

type CriarSlotInput = { inicio: Date; idUsuario: number };

export class CriarNovoSlotDeAgenda {
  constructor(
    private readonly agendaService: CriarSlotAgendaService &
      RecuperaSlotsAgendaService,
    private readonly dateTimeHelper: IDateAdd & IDateStartOfDay & IDateEndOfDay,
    private readonly authorizationService: IAuthorizationService,
  ) {}

  async execute(input: CriarSlotInput) {
    await this.verificaPermissao(input.idUsuario);

    const horarioInicio = input.inicio;
    const horarioFim = this.dateTimeHelper.add(horarioInicio, 1);

    await this.verificaDisponibilidadeDoHorario(
      horarioInicio,
      horarioFim,
      input.idUsuario,
    );

    await this.agendaService.criarSlotNovo({
      inicio: horarioInicio,
      fim: horarioFim,
      idAtendente: input.idUsuario,
    });
  }

  private async verificaDisponibilidadeDoHorario(
    horarioInicioSlot: Date,
    horarioFimSlot: Date,
    idAtendente: number,
  ) {
    const inicioDoDia = this.dateTimeHelper.startOfDay(horarioInicioSlot);

    const finalDoDia = this.dateTimeHelper.endOfDay(horarioFimSlot);
    const slotsNaAgenda = await this.agendaService.recuperaSlots({
      inicio: inicioDoDia,
      fim: finalDoDia,
      idAtendente: idAtendente,
    });
    if (slotsNaAgenda.some(verificaSeSlotSobrepoe)) {
      throw new HorarioOcupado();
    }

    function verificaSeSlotSobrepoe(slot) {
      return slot.inicio < horarioFimSlot && slot.fim > horarioInicioSlot;
    }
  }

  private async verificaPermissao(idUsuario: number) {
    if (
      !(await this.authorizationService.verificaTipoDoUsuario(
        idUsuario,
        TipoUsuario.ATENDENTE,
      ))
    ) {
      throw new UsuarioNaoAtendente();
    }
  }
}

export class UsuarioNaoAtendente extends Error {
  constructor() {
    super('Usuário precisa ser atendente.');
  }
}

export class HorarioOcupado extends Error {
  constructor() {
    super('Ja existe outro slot neste horario');
  }
}
