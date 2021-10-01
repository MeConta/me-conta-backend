export interface CriarSlotAgendaParams {
  inicio: Date;
  fim: Date;
  idAtendente: number;
}
export interface CriarSlotAgendaService {
  criarSlotNovo(param: CriarSlotAgendaParams): Promise<void>;
}
