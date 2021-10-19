import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { IBuscarUsuarioViaEmail } from '../../usuarios/casos-de-uso/buscar-usuario-email.feat';
import { IHashService } from '../../usuarios/services/hash.service';

export class ValidarUsuario {
  constructor(
    private readonly usuarioService: IBuscarUsuarioViaEmail,
    private readonly hashService: IHashService,
  ) {}
  async execute(email: string, senha: string): Promise<Usuario> {
    const usuario = await this.usuarioService.findByEmail(email);
    if (usuario && (await this.hashService.compare(senha, usuario.senha))) {
      return usuario;
    }
    return null;
  }
}
