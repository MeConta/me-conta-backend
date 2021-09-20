import { CriarSlotAgendaService } from '../criar-slot-agenda.service';

export class InMemoryAgendaService implements CriarSlotAgendaService {
  slots: {
    inicio: Date;
    fim: Date;
    idAtendente: string;
  }[];

  constructor() {
    this.slots = [];
  }

  async criarSlotNovo(param: {
    inicio: Date;
    fim: Date;
    idAtendente: string;
  }): Promise<void> {
    this.slots.push({
      inicio: param.inicio,
      fim: param.fim,
      idAtendente: param.idAtendente,
    });
  }
}
