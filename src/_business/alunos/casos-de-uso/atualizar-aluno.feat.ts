import { Aluno, Motivos } from '../entidades/aluno.entity';
import { Perfil } from '../../usuarios/entidades/usuario.entity';
import { CadastrarAluno } from './cadastrar-aluno.feat';
import { IBuscarPerfilByIdService } from '../../perfil/services/perfil.service';

export type AtualizarAlunoInput = Partial<Aluno & Perfil & Motivos>;

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
    private readonly alunoService: IBuscarAlunoViaId,
    private readonly perfilService: IBuscarPerfilByIdService,
    private readonly cadastroAluno: CadastrarAluno,
  ) {}

  async execute(id: number, input: AtualizarAlunoInput): Promise<void> {
    const aluno = await this.alunoService.findById(id);
    const perfil = await this.perfilService.findById(id);
    if (!aluno || !perfil) {
      throw new AlunoNaoEncontradoError();
    }

    await this.cadastroAluno.execute({
      ...aluno,
      ...perfil,
      ...input,
    });
  }
}
