export interface CriarSlotAgendaService {
  criarSlotNovo(param: { inicio: Date; fim: Date; idAtendente: string }): void;
}
