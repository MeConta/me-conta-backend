import { Aluno, Motivos } from '../entidades/aluno.entity';
import { IAtualizarPerfilService } from '../../perfil/services/atualizar-perfil.service';
import { Perfil } from '../../usuarios/entidades/usuario.entity';

export type AtualizarAlunoInput = Partial<Aluno & Motivos>;

export interface IAtualizarAlunoService {
  atualizar(id: number, input: AtualizarAlunoInput): Promise<Aluno & Motivos>;
}

export interface IBuscarAlunoViaId {
  findById(id: number): Promise<Aluno & Motivos>;
}

export class AlunoNaoEncontradoError extends Error {
  code = 404;
  message = 'Aluno não encontrado';
}

export class AtualizarAluno {
  constructor(
    private readonly alunoService: IAtualizarAlunoService & IBuscarAlunoViaId,
    private readonly perfilService: IAtualizarPerfilService,
  ) {}

  async execute(
    id: number,
    input: AtualizarAlunoInput & Partial<Perfil>,
  ): Promise<void> {
    if (!(await this.alunoService.findById(id))) {
      throw new AlunoNaoEncontradoError();
    }
    await this.perfilService.atualizar(id, input);
    await this.alunoService.atualizar(id, input);
  }
}
