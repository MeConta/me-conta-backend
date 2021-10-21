import { Usuario } from '../entidades/usuario.entity';

export type IAtualizarUsuario = Partial<Omit<Usuario, 'salt'>>;

export interface IAtualizarUsuarioService {
  atualizar(id: number, input: IAtualizarUsuario): Promise<Usuario>;
}

export interface IBuscarUsuarioViaEmailService {
  findByEmail(email: string): Promise<Usuario>;
}
