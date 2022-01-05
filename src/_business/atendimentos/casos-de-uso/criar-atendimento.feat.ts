import { NovoAtendimento } from '../entidades/atendimentos.entity';
import { INovoAtendimentoService } from '../../../_adapters/atendimentos/services/atendimentos.service';
import { IBuscarVoluntarioViaId } from '../../voluntarios/services/voluntario.service';
import { VoluntarioNaoEncontradoError } from '../../admin/casos-de-uso/autorizar-voluntario.feat';
import {
  AlunoNaoEncontradoError,
  IBuscarAlunoViaId,
} from '../../alunos/casos-de-uso/atualizar-aluno.feat';
import { IDateGreaterThan } from '../../agenda/services/date-time.service';

export class ConsultaNaoAconteceuError extends Error {
  code = 422;
  message = 'A data da consulta está no futuro';
}

export class CriarAtendimento {
  constructor(
    private readonly atendimentoService: INovoAtendimentoService,
    private readonly voluntarioService: IBuscarVoluntarioViaId,
    private readonly alunoService: IBuscarAlunoViaId,
    private readonly dateHelper: IDateGreaterThan,
  ) {}
  async execute(novoAtendimento: NovoAtendimento): Promise<void> {
    const voluntario = await this.voluntarioService.findById(
      (
        await novoAtendimento.voluntario
      ).id,
    );
    const aluno = await this.alunoService.findById(
      (
        await novoAtendimento.aluno
      ).id,
    );

    if (!voluntario) {
      throw new VoluntarioNaoEncontradoError();
    }
    if (!aluno) {
      throw new AlunoNaoEncontradoError();
    }
    if (this.dateHelper.greaterThan(novoAtendimento.data, new Date())) {
      throw new ConsultaNaoAconteceuError();
    }

    await this.atendimentoService.criar(novoAtendimento);
  }
}
