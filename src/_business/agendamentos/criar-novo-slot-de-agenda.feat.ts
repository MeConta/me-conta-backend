import { CriarSlotAgendaService } from './criar-slot-agenda.service';
import { DateTimeUtils } from './date-time.utils';
import { Tipo } from '../../usuario/entities/usuario.enum';

type CriarSlotInput = { inicio: Date; idUsuario: string };

export interface AuthorizationService {
  verificaPertenceAoGrupo(idUsuario: string, grupo: Tipo): Promise<boolean>;
}

export class CriarNovoSlotDeAgenda {
  constructor(
    private readonly agendaService: CriarSlotAgendaService,
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
    this.agendaService.criarSlotNovo({
      inicio: input.inicio,
      fim: this.dateTimeHelper.addHours(input.inicio, 1),
      idAtendente: input.idUsuario,
    });
  }
}

export class UsuarioNaoAtendente extends Error {
  constructor() {
    super('Usuário precisa ser atendente.');
  }
}
