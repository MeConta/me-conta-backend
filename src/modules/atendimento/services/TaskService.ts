import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  IAtualizarStatusAtendimentoService,
  IBuscarAtendimentosAntigosEmAbertoService,
} from '../../../_adapters/atendimentos/services/atendimentos.service';
import { TypeormAtendimentosService } from '../../../_adapters/atendimentos/services/typeorm-atendimentos.service';
import { StatusAtendimento } from '../../../_business/atendimentos/entidades/atendimentos.entity';

@Injectable()
export class TasksService {
  constructor(
    @Inject(TypeormAtendimentosService)
    private atendimentoService: IBuscarAtendimentosAntigosEmAbertoService &
      IAtualizarStatusAtendimentoService,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async realizaAtendimentosAntigos() {
    const atendimentos = await this.atendimentoService.buscarAntigosEmAberto();
    for (const atendimento of atendimentos) {
      await this.atendimentoService.atualizarStatus(
        atendimento.id,
        StatusAtendimento.REALIZADO,
      );
    }
  }
}
