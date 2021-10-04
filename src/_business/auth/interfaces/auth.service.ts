import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { Token } from './auth';

export interface IAuthService {
  validateUser(email: string, password: string): Promise<Usuario>;
  login(usuario: Usuario): Token;
}
