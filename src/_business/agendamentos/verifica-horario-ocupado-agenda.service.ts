export interface VerificaHorarioOcupadoAgendaService {
  verificaHorarioOcupado(param: { inicio: Date; fim: Date }): Promise<boolean>;
}
