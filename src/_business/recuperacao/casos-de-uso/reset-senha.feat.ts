import { IAtualizarUsuarioService } from '../../usuarios/services/usuario.service';
import {
  IBuscarRecuperacaoService,
  IRemoverRecuperacaoService,
} from '../services/recuperacao.service';
import { IHashHashService } from '../../usuarios/services/hash.service';
import { IDateGreaterThan } from '../../agenda/services/date-time.service';

export type ResetSenhaInput = { hash: string; senha: string };

export class RecuperacaoNotFoundError extends Error {
  code = 404;
  message = 'Pedido de recuperação de senha não encontrado';
}
export class RecuperacaoExpiradaError extends Error {
  code = 422;
  message = 'Pedido de recuperação de senha expirado';
}

export class ResetSenha {
  constructor(
    private readonly recuperacaoService: IBuscarRecuperacaoService &
      IRemoverRecuperacaoService,
    private readonly usuarioService: IAtualizarUsuarioService,
    private readonly hashService: IHashHashService,
    private readonly dateService: IDateGreaterThan,
  ) {}

  async execute(input: ResetSenhaInput): Promise<void> {
    const { hash } = input;
    const { usuario, dataExpiracao } =
      (await this.recuperacaoService.findByHash(hash)) || {};
    if (!usuario) {
      throw new RecuperacaoNotFoundError();
    }
    if (this.dateService.greaterThan(new Date(), dataExpiracao)) {
      await this.recuperacaoService.remover(hash);
      throw new RecuperacaoExpiradaError();
    }
    await this.usuarioService.atualizar(usuario.id, {
      senha: await this.hashService.hash(input.senha, usuario.salt),
    });
    await this.recuperacaoService.remover(hash);
  }
}
