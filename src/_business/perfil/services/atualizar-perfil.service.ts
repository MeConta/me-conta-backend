import { Perfil } from '../../usuarios/entidades/usuario.entity';

export interface IAtualizarPerfilService {
  atualizar(id: number, input: Partial<Perfil>): Promise<void>;
}
