import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { IBuscarUsuarioViaId } from '../../usuarios/casos-de-uso/buscar-usuario.id.feat';
import { IHashCompareService } from '../../usuarios/services/hash.service';

export class ValidarUsuarioComRefreshToken {
  constructor(
    private readonly usuarioService: IBuscarUsuarioViaId,
    private readonly hashService: IHashCompareService,
  ) {}

  async execute(refreshToken: string, userId: number): Promise<Usuario> {
    const usuario = await this.usuarioService.findById(userId);

    console.log('Refresh Token Received', refreshToken);
    console.log('Refresh Token User', usuario);

    const hashMatch = await this.hashService.compare(
      refreshToken,
      usuario.refreshTokenHashed,
    );

    if (!hashMatch) {
      return null;
    }

    return usuario;
  }
}
