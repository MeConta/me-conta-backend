import { NovoAtendimento } from '../../../_business/atendimentos/entidades/atendimentos.entity';

export interface IRealizarNovoAtendimentoService {
  realizar(atendimento: NovoAtendimento): Promise<void>;
}
