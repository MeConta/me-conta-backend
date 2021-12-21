import { NovoAtendimento } from '../entidades/atendimentos.entity';
import { IRealizarNovoAtendimentoService } from '../../../_adapters/atendimentos/services/atendimentos.service';

export class RealizarAtendimento {
  constructor(
    private readonly atendimentoService: IRealizarNovoAtendimentoService,
  ) {}
  async execute(input: NovoAtendimento): Promise<void> {
    await this.atendimentoService.realizar(input);
  }
}
