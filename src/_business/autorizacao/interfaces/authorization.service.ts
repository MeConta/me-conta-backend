import { Tipo } from '../../../usuario/entities/usuario.enum';

export interface AuthorizationService {
  verificaPertenceAoGrupo(idUsuario: string, grupo: Tipo): Promise<boolean>;
}
