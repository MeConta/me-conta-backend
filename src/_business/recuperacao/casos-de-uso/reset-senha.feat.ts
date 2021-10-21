import { IAtualizarUsuarioService } from '../../usuarios/services/usuario.service';
import {
  IBuscarRecuperacaoService,
  IRemoverRecuperacaoService,
} from '../services/recuperacao.service';
import { IHashHashService } from '../../usuarios/services/hash.service';

export type ResetSenhaInput = { hash: string; senha: string };

export class RecuperacaoNotFoundError extends Error {
  code = 404;
  message = 'Pedido de recuperação de senha não encontrado';
}

export class ResetSenha {
  constructor(
    private readonly recuperacaoService: IBuscarRecuperacaoService &
      IRemoverRecuperacaoService,
    private readonly usuarioService: IAtualizarUsuarioService,
    private readonly hashService: IHashHashService,
  ) {}

  async execute(input: ResetSenhaInput): Promise<void> {
    const { hash } = input;
    const { usuario } = (await this.recuperacaoService.findByHash(hash)) || {};
    if (!usuario) {
      throw new RecuperacaoNotFoundError();
    }
    await this.usuarioService.atualizar(usuario.id, {
      senha: await this.hashService.hash(input.senha, usuario.salt),
    });
    await this.recuperacaoService.remover(hash);
  }
}
