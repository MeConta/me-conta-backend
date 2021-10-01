import { Usuario } from '../entidades/usuario.entity';

export interface IBuscarUsuarioViaEmail {
  findByEmail(email: string): Promise<Usuario>;
}
export class BuscarUsuarioEmail {
  constructor(private readonly usuarioService: IBuscarUsuarioViaEmail) {}
  async execute(input: string) {
    return this.usuarioService.findByEmail(input);
  }
}
