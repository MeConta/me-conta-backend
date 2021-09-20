import { CriarSlotAgendaService } from './criar-slot-agenda.service';
import { DateTimeUtils } from './date-time.utils';

type CriarSlotInput = { inicio: Date; idAtendente: string };

export class CriarNovoSlotDeAgenda {
  constructor(
    private readonly agendaService: CriarSlotAgendaService,
    private readonly dateTimeHelper: DateTimeUtils,
  ) {}

  async execute(input: CriarSlotInput) {
    this.agendaService.criarSlotNovo({
      inicio: input.inicio,
      fim: this.dateTimeHelper.addHours(input.inicio, 1),
      idAtendente: input.idAtendente,
    });
  }
}
