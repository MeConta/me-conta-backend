import { Bio, Voluntario } from '../entidades/voluntario.entity';
import { Usuario } from '../../usuarios/entidades/usuario.entity';

export interface IAtualizarAprovacaoVoluntario {
  atualizarAprovacao(id: number, aprovado: boolean): Promise<void>;
}

export interface IBuscarVoluntarioViaId {
  findById(id: number): Promise<Voluntario & Bio>;
}

export interface IBuscarVoluntarios {
  buscar(
    search?: Partial<Voluntario & { usuario: Usuario }>,
  ): Promise<(Voluntario & Bio)[]>;
}
