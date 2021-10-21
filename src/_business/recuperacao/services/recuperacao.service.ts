import { Recuperacao } from '../entidades/recuperacao.entity';

export interface ISalvarHashRecuperacaoService {
  salvar(input: Recuperacao): Promise<void>;
}
export interface IBuscarRecuperacaoService {
  findByHash(hash: string): Promise<Recuperacao>;
}

export interface IRemoverRecuperacaoService {
  remover(hash: string): Promise<void>;
}
