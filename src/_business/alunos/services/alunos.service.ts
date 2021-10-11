import { NovoAluno } from '../entidades/aluno.entity';

export interface ICadastrarNovoAlunoService {
  cadastrar(aluno: NovoAluno): Promise<void>;
}
