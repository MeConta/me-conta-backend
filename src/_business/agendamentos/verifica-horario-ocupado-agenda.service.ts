export interface VerificaHorarioOcupadoAgendaService {
  verificaHorarioOcupado(param: {
    inicio: Date;
    fim: Date;
    idAtendente: string;
  }): Promise<boolean>;
}
