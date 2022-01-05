import {
  Atendimento,
  NovoAtendimento, StatusAtendimento,
} from '../../../_business/atendimentos/entidades/atendimentos.entity';

export interface INovoAtendimentoService {
  criar(atendimento: NovoAtendimento): Promise<void>;
}

export interface IBuscarAtendimentoViaIdService {
  buscar(id: number): Promise<Atendimento>;
}

export interface IAtualizarStatusAtendimentoService {
  atualizarStatus(id: number, status: StatusAtendimento): Promise<Atendimento>;
}

export interface IHistoricoAtendimentoService {
  consultar(alunoId: number): Promise<Atendimento[]>;
}
