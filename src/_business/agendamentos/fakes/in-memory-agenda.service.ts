import { CriarSlotAgendaService } from '../criar-slot-agenda.service';
import { VerificaHorarioOcupadoAgendaService } from '../verifica-horario-ocupado-agenda.service';

export class InMemoryAgendaService
  implements CriarSlotAgendaService, VerificaHorarioOcupadoAgendaService
{
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

  async verificaHorarioOcupado(param: {
    inicio: Date;
    fim: Date;
    idAtendente: string;
  }): Promise<boolean> {
    return this.slots.some((slot) => {
      return (
        param.idAtendente === slot.idAtendente &&
        !(param.fim <= slot.inicio || param.inicio >= slot.fim)
      );
    });
  }
}
