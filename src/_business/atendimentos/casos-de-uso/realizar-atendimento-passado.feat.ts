import { IRealizarAtendimentosPassados } from '../../../_adapters/atendimentos/services/atendimentos.service';

export class RealizarAtendimentoPassado {
  constructor(
    private readonly atendimentoService: IRealizarAtendimentosPassados,
  ) {}
  async execute(): Promise<void> {
    await this.atendimentoService.realizarPassados();
  }
}
