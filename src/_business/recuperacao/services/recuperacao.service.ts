import { Recuperacao } from '../entidades/recuperacao.entity';

export interface ISalvarHashRecuperacaoService {
  salvar(input: Recuperacao): Promise<void>;
}

export interface ICriarHashRecuperacaoService {
  criarHash(): Promise<string>;
}
