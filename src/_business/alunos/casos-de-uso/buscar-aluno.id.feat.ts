import { Aluno } from '../entidades/aluno.entity';
import { IBuscarAlunoViaId } from '../services/alunos.service';

export class AlunoNaoEncontradoError extends Error {
  code = 404;
  message = 'Aluno não encontrado';
}

export class BuscarAlunoViaId {
  constructor(private readonly alunoService: IBuscarAlunoViaId) {}

  async execute(id: number): Promise<Aluno> {
    const aluno = await this.alunoService.findById(id);
    return aluno;
  }
}
