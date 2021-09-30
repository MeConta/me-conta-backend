import { NovoUsuario } from '../casos-de-uso/cadastrar-novo-usuario.feat';

export interface CadastrarNovoUsuarioService {
  cadastrar(usuario: NovoUsuario & { salt: string }): Promise<void>;
}
