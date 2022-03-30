import { Usuario } from '../entidades/usuario.entity';

export interface IBuscarUsuarioViaId {
  findById(id: number): Promise<Usuario>;
}
export class BuscarUsuarioViaId {
  constructor(private readonly usuarioService: IBuscarUsuarioViaId) {}

  async execute(id: number): Promise<Usuario> {
    return this.usuarioService.findById(id);
  }
}
