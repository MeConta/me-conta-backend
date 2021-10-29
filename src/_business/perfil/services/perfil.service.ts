import { Perfil } from '../../usuarios/entidades/usuario.entity';

export interface IAtualizarPerfilService {
  atualizar(id: number, input: Partial<Perfil>): Promise<void>;
}

export interface ICadastrarPerfilService {
  cadastrar(perfil: Perfil): Promise<void>;
}

export interface IBuscarPerfilByIdService {
  findById(id: number): Promise<Perfil>;
}
