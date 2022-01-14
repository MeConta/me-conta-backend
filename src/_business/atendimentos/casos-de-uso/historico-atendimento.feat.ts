import { Atendimento } from '../entidades/atendimentos.entity';
import { IHistoricoAtendimentoService } from '../../../_adapters/atendimentos/services/atendimentos.service';
import {
  AlunoNaoEncontradoError,
  IBuscarAlunoViaId,
} from '../../alunos/casos-de-uso/atualizar-aluno.feat';
import { Usuario } from '../../usuarios/entidades/usuario.entity';

export class HistoricoAtendimento {
  constructor(
    private readonly alunoService: IBuscarAlunoViaId,
    private readonly atendimentoService: IHistoricoAtendimentoService,
  ) {}
  async execute(alunoId: Usuario['id']): Promise<Atendimento[]> {
    const aluno = await this.alunoService.findById(alunoId);

    if (!aluno) {
      throw new AlunoNaoEncontradoError();
    }

    return this.atendimentoService.consultar(alunoId);
  }
}
