import {
  Atendimento,
  NovoAtendimento,
} from '../../../_business/atendimentos/entidades/atendimentos.entity';

export interface IRealizarNovoAtendimentoService {
  realizar(atendimento: NovoAtendimento): Promise<void>;
}

export interface IHistoricoAtendimentoService {
  consultar(alunoId: number): Promise<Atendimento[]>;
}
