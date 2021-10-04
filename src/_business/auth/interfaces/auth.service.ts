import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { IToken } from './auth';

export interface IAuthService {
  validateUser(email: string, password: string): Promise<Usuario>;
  login(usuario: Usuario): IToken;
}
