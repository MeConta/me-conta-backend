import { IBuscarUsuarioViaEmailService } from '../services/usuario.service';

export class BuscarUsuarioEmail {
  constructor(private readonly usuarioService: IBuscarUsuarioViaEmailService) {}
  async execute(input: string) {
    return this.usuarioService.findByEmail(input);
  }
}
