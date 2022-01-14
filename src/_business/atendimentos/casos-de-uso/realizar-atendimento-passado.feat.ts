export class RealizarAtendimentoPassado {
  constructor(private readonly atendimentoService) {}
  async execute(): Promise<void> {
    await this.atendimentoService.realizarPassados();
  }
}
