import {
  Atendimento,
  NovoAtendimento,
  StatusAtendimento,
} from '../../../_business/atendimentos/entidades/atendimentos.entity';

export interface INovoAtendimentoService {
  criar(atendimento: NovoAtendimento): Promise<void>;
}

export interface IBuscarAtendimentoViaIdService {
  buscar(id: Atendimento['id']): Promise<Atendimento>;
}

export interface IAtualizarStatusAtendimentoService {
  atualizarStatus(
    id: Atendimento['id'],
    status: StatusAtendimento,
  ): Promise<Atendimento>;
}

export interface IHistoricoAtendimentoService {
  consultar(aluno: Atendimento['aluno']): Promise<Atendimento[]>;
}
