import { Tipo } from '../../../../__old/usuario/entities/usuario.enum';

export interface AuthorizationService {
  verificaTipoDoUsuario(idUsuario: number, grupo: Tipo): Promise<boolean>;
}
