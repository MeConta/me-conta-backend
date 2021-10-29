import { IBuscarVoluntarioViaId } from '../services/voluntario.service';
import { IBuscarPerfilByIdService } from '../../perfil/services/perfil.service';
import {
  CadastrarVoluntario,
  NovoVoluntario,
} from './cadastrar-voluntario.feat';
import { VoluntarioNaoEncontradoError } from '../../admin/casos-de-uso/autorizar-voluntario.feat';

type AtualizarVoluntarioInput = Partial<NovoVoluntario>;

export class AtualizarVoluntario {
  constructor(
    private readonly voluntarioService: IBuscarVoluntarioViaId,
    private readonly perfilService: IBuscarPerfilByIdService,
    private readonly cadastroVoluntario: CadastrarVoluntario,
  ) {}

  async execute(id: number, input: AtualizarVoluntarioInput): Promise<void> {
    const voluntario = await this.voluntarioService.findById(id);
    const perfil = await this.perfilService.findById(id);
    if (!voluntario || !perfil) {
      throw new VoluntarioNaoEncontradoError();
    }

    await this.cadastroVoluntario.execute({
      ...voluntario,
      ...perfil,
      ...input,
    });
  }
}
