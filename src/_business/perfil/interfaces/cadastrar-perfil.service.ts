import { Perfil } from '../../usuarios/entidades/usuario.entity';

export interface ICadastrarPerfilService {
  cadastrar(perfil: Perfil): Promise<void>;
}
