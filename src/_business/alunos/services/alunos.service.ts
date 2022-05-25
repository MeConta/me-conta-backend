import { NovoAluno } from '../entidades/aluno.entity';

export interface ICadastrarNovoAlunoService {
  cadastrar(aluno: NovoAluno): Promise<void>;
}

export interface IBuscarAlunoViaId {
  findById(id: number): Promise<NovoAluno>;
}
