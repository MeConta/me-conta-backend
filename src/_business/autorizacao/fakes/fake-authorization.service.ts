import { Tipo } from '../../../usuario/entities/usuario.enum';
import { AuthorizationService } from '../interfaces/authorization.service';

export class FakeAuthorizationService implements AuthorizationService {
  verificaPertenceAoGrupo(idUsuario: string, grupo: Tipo): Promise<boolean> {
    if (idUsuario === 'some-atendente-id' && grupo === Tipo.ATENDENTE) {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  }
}
