import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { IHashCompareService } from '../../usuarios/services/hash.service';
import { IBuscarUsuarioViaEmailService } from '../../usuarios/services/usuario.service';

export class ValidarUsuario {
  constructor(
    private readonly usuarioService: IBuscarUsuarioViaEmailService,
    private readonly hashService: IHashCompareService,
  ) {}
  async execute(email: string, senha: string): Promise<Usuario> {
    const usuario = await this.usuarioService.findByEmail(email);
    if (usuario && (await this.hashService.compare(senha, usuario.senha))) {
      return usuario;
    }
    return null;
  }
}
