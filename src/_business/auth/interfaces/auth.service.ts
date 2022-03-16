import { IAtualizarUsuario } from '../../usuarios/services/usuario.service';
import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { IToken } from './auth';

export interface IAuthService {
  validateUser(email: string, password: string): Promise<Usuario>;
  login(usuario: Usuario): IToken;
  logout(id: number, input: IAtualizarUsuario): void;
}
