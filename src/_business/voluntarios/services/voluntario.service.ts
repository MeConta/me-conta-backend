import { Voluntario } from '../entidades/voluntario.entity';

export interface IAtualizarAprovacaoVoluntario {
  atualizarAprovacao(id: number, aprovado: boolean): Promise<void>;
}

export interface IBuscarVoluntarioViaId {
  findById(id: number): Promise<Voluntario>;
}
