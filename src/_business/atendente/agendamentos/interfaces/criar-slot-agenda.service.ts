export interface CriarSlotAgendaParams {
  inicio: Date;
  fim: Date;
  idAtendente: string;
}
export interface CriarSlotAgendaService {
  criarSlotNovo(param: CriarSlotAgendaParams): Promise<void>;
}
