import { CriarSlotAgendaService } from './criar-slot-agenda.service';
import { DateTimeUtils } from './date-time.utils';
import { Tipo } from '../../usuario/entities/usuario.enum';
import { AuthorizationService } from '../autorizacao/authorization.service';
import { VerificaHorarioOcupadoAgendaService } from './verifica-horario-ocupado-agenda.service';

type CriarSlotInput = { inicio: Date; idUsuario: string };

export class CriarNovoSlotDeAgenda {
  constructor(
    private readonly agendaService: CriarSlotAgendaService &
      VerificaHorarioOcupadoAgendaService,
    private readonly dateTimeHelper: DateTimeUtils,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async execute(input: CriarSlotInput) {
    if (
      !(await this.authorizationService.verificaPertenceAoGrupo(
        input.idUsuario,
        Tipo.ATENDENTE,
      ))
    ) {
      throw new UsuarioNaoAtendente();
    }

    const horarioFim = this.dateTimeHelper.addHours(input.inicio, 1);

    if (
      await this.agendaService.verificaHorarioOcupado({
        inicio: input.inicio,
        fim: horarioFim,
      })
    ) {
      throw new HorarioOcupado();
    }

    this.agendaService.criarSlotNovo({
      inicio: input.inicio,
      fim: horarioFim,
      idAtendente: input.idUsuario,
    });
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
