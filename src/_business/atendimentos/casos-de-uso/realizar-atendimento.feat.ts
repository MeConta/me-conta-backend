import { NovoAtendimento } from '../entidades/atendimentos.entity';
import { IRealizarNovoAtendimentoService } from '../../../_adapters/atendimentos/services/atendimentos.service';
import { IBuscarVoluntarioViaId } from '../../voluntarios/services/voluntario.service';
import { VoluntarioNaoEncontradoError } from '../../admin/casos-de-uso/autorizar-voluntario.feat';

export class RealizarAtendimento {
  constructor(
    private readonly atendimentoService: IRealizarNovoAtendimentoService,
    private readonly voluntarioService: IBuscarVoluntarioViaId,
  ) {}
  async execute(novoAtendimento: NovoAtendimento): Promise<void> {
    const voluntario = await this.voluntarioService.findById(
      (
        await novoAtendimento.voluntario
      ).id,
    );

    if (!voluntario) {
      throw new VoluntarioNaoEncontradoError();
    }
    await this.atendimentoService.realizar(novoAtendimento);
  }
}
