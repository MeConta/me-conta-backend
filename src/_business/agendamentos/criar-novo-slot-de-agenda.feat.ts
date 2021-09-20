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
    await this.verificaPermissao(input);

    const horarioFim = this.dateTimeHelper.addHours(input.inicio, 1);
    await this.verificaDisponibilidadeDoHorario(input, horarioFim);

    this.agendaService.criarSlotNovo({
      inicio: input.inicio,
      fim: horarioFim,
      idAtendente: input.idUsuario,
    });
  }

  private async verificaDisponibilidadeDoHorario(
    input: CriarSlotInput,
    horarioFim: Date,
  ) {
    if (
      await this.agendaService.verificaHorarioOcupado({
        inicio: input.inicio,
        fim: horarioFim,
        idAtendente: input.idUsuario,
      })
    ) {
      throw new HorarioOcupado();
    }
  }

  private async verificaPermissao(input: CriarSlotInput) {
    if (
      !(await this.authorizationService.verificaPertenceAoGrupo(
        input.idUsuario,
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
