import {
  Atendimento,
  NovoAtendimento,
} from '../../../_business/atendimentos/entidades/atendimentos.entity';

export interface INovoAtendimentoService {
  criar(atendimento: NovoAtendimento): Promise<void>;
}

export interface IHistoricoAtendimentoService {
  consultar(alunoId: number): Promise<Atendimento[]>;
}
