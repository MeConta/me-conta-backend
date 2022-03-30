import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { IBuscarUsuarioViaId } from '../../usuarios/casos-de-uso/buscar-usuario.id.feat';
import { IHashCompareService } from '../../usuarios/services/hash.service';

export class ValidarUsuarioComRefreshToken {
  constructor(
    private readonly usuarioService: IBuscarUsuarioViaId,
    private readonly hashService: IHashCompareService,
  ) {}

  async execute(refreshToken: string, userId: number): Promise<Usuario> {
    console.log(typeof userId);
    const usuario = await this.usuarioService.findById(userId);

    console.log('refreshToken', refreshToken);
    console.log('Usuario com refresh token atualizado', usuario);

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
