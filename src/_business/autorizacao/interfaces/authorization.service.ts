import { Tipo } from '../../../usuario/entities/usuario.enum';

export interface AuthorizationService {
  verificaTipoDoUsuario(idUsuario: number, grupo: Tipo): Promise<boolean>;
}
