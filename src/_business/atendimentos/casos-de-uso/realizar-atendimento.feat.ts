import { NovoAtendimento } from '../entidades/atendimentos.entity';
import { IRealizarNovoAtendimentoService } from '../../../_adapters/atendimentos/services/atendimentos.service';
import { IBuscarVoluntarioViaId } from '../../voluntarios/services/voluntario.service';
import { VoluntarioNaoEncontradoError } from '../../admin/casos-de-uso/autorizar-voluntario.feat';
import {
  AlunoNaoEncontradoError,
  IBuscarAlunoViaId,
} from '../../alunos/casos-de-uso/atualizar-aluno.feat';

export class RealizarAtendimento {
  constructor(
    private readonly atendimentoService: IRealizarNovoAtendimentoService,
    private readonly voluntarioService: IBuscarVoluntarioViaId,
    private readonly alunoService: IBuscarAlunoViaId,
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

    await this.atendimentoService.realizar(novoAtendimento);
  }
}
