import { CriarSlotAgendaService } from '../interfaces/criar-slot-agenda.service';
import { DateTimeUtils } from '../interfaces/date-time.utils';
import { Tipo } from '../../../../usuario/entities/usuario.enum';
import { AuthorizationService } from '../../../autorizacao/interfaces/authorization.service';
import { RecuperaSlotsAgendaService } from '../interfaces/recupera-slots-agenda.service';

type CriarSlotInput = { inicio: Date; idUsuario: string };

export class CriarNovoSlotDeAgenda {
  constructor(
    private readonly agendaService: CriarSlotAgendaService &
      RecuperaSlotsAgendaService,
    private readonly dateTimeHelper: DateTimeUtils,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async execute(input: CriarSlotInput) {
    await this.verificaPermissao(input.idUsuario);

    const horarioInicio = input.inicio;
    const horarioFim = this.dateTimeHelper.addHours(horarioInicio, 1);

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
    idAtendente: string,
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

  private async verificaPermissao(idUsuario: string) {
    if (
      !(await this.authorizationService.verificaTipoDoUsuario(
        idUsuario,
        Tipo.ATENDENTE,
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
