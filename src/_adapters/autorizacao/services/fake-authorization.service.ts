import { IAuthorizationService } from '../../../_business/autorizacao/interfaces/authorization.service';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';

export class FakeAuthorizationService implements IAuthorizationService {
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
