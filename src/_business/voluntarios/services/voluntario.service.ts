import { Voluntario } from '../entidades/voluntario.entity';
import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { VoluntarioOutput } from '../dtos/voluntario.dto';

export interface IAtualizarAprovacaoVoluntario {
  atualizarAprovacao(id: number, aprovado: boolean): Promise<void>;
}

export interface IBuscarVoluntarioViaId {
  findById(id: number): Promise<VoluntarioOutput>;
}

export interface IBuscarVoluntarios {
  buscar(
    search?: Partial<Voluntario & { usuario: Usuario }>,
  ): Promise<VoluntarioOutput[]>;
}
