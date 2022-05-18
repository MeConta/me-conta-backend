import { IAtualizarUsuarioService } from '../../usuarios/services/usuario.service';
import {
  IBuscarRecuperacaoService,
  IRemoverRecuperacaoService,
} from '../services/recuperacao.service';
import { IHashHashService } from '../../usuarios/services/hash.service';
import { IDateGreaterThan } from '../../agenda/services/date-time.service';
import {
  RecuperacaoExpiradaError,
  RecuperacaoNotFoundError,
} from './reset-senha.feat';

export type ResetSenhaInput = { hash: string; senha: string };

export class ValidaHash {
  constructor(
    private readonly recuperacaoService: IBuscarRecuperacaoService &
      IRemoverRecuperacaoService,
    private readonly usuarioService: IAtualizarUsuarioService,
    private readonly hashService: IHashHashService,
    private readonly dateService: IDateGreaterThan,
  ) {}

  async execute(hash: string): Promise<any> {
    const { usuario, dataExpiracao } =
      (await this.recuperacaoService.findByHash(hash)) || {};
    if (this.dateService.greaterThan(new Date(), dataExpiracao)) {
      await this.recuperacaoService.remover(hash);
      throw new RecuperacaoExpiradaError();
    }
    if (!usuario) {
      throw new RecuperacaoNotFoundError();
    }
    return usuario;
  }
}
