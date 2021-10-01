import { Usuario } from '../entidades/usuario.entity';

export interface IBuscarUsuarioViaId {
  findById(input: number): Promise<Usuario>;
}
export class BuscarUsuarioViaId {
  constructor(private readonly usuarioService: IBuscarUsuarioViaId) {}

  async execute(input: number): Promise<Usuario> {
    return this.usuarioService.findById(input);
  }
}
