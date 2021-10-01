import { TipoUsuario } from '../../usuarios/casos-de-uso/cadastrar-novo-usuario.feat';

export interface AuthorizationService {
  verificaTipoDoUsuario(
    idUsuario: number,
    grupo: TipoUsuario,
  ): Promise<boolean>;
}
