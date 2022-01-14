import {
  Atendimento,
  NovoAtendimento,
  StatusAtendimento,
} from '../../../_business/atendimentos/entidades/atendimentos.entity';
import { Usuario } from '../../../_business/usuarios/entidades/usuario.entity';

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
  consultar(aluno: Usuario['id']): Promise<Atendimento[]>;
}
