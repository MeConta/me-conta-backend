import { TipoUsuario } from '../../usuarios/casos-de-uso/cadastrar-novo-usuario.feat';

export interface IAuthorizationService {
  verificaTipoDoUsuario(
    idUsuario: number,
    grupo: TipoUsuario,
  ): Promise<boolean>;
}
