import { AuthorizationService } from '../interfaces/authorization.service';
import { TipoUsuario } from '../../usuarios/casos-de-uso/cadastrar-novo-usuario.feat';

export class FakeAuthorizationService implements AuthorizationService {
  verificaTipoDoUsuario(
    idUsuario: number,
    grupo: TipoUsuario,
  ): Promise<boolean> {
    if (idUsuario === 1 && grupo === TipoUsuario.ATENDENTE) {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  }
}
