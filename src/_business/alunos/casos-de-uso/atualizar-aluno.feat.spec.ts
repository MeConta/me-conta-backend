import { Aluno, TipoEscola } from '../entidades/aluno.entity';
import { createMock } from '@golevelup/ts-jest';
import {
  AlunoNaoEncontradoError,
  AtualizarAluno,
  AtualizarAlunoInput,
  IAtualizarAlunoService,
  IBuscarAlunoViaId,
} from './atualizar-aluno.feat';
import { IAtualizarPerfilService } from '../../perfil/services/atualizar-perfil.service';

class InMemoryAlunoService
  implements IAtualizarAlunoService, IBuscarAlunoViaId
{
  alunos: Aluno[] = [];

  async atualizar(id: number, input: AtualizarAlunoInput): Promise<Aluno> {
    this.alunos[id] = { ...this.alunos[id], ...input } as Aluno;
    return Promise.resolve(this.alunos[id]);
  }

  findById(id: number): Promise<Aluno> {
    return Promise.resolve(this.alunos[id]);
  }
}

describe('Atualizar Aluno', function () {
  let sut: AtualizarAluno;
  let service: InMemoryAlunoService;
  const perfilService = createMock<IAtualizarPerfilService>();

  beforeEach(async () => {
    service = new InMemoryAlunoService();
    service.alunos[0] = {
      ...createMock<Aluno>(),
      tipoEscola: TipoEscola.PUBLICA,
    };
    sut = new AtualizarAluno(service, perfilService);
  });

  // beforeEach(async () => {});

  it('Deve ser definido', async () => {
    expect(sut).toBeDefined();
  });

  it('Deve alterar informações do Aluno', async () => {
    await sut.execute(0, {
      tipoEscola: TipoEscola.PARTICULAR,
    });
    const [aluno] = service.alunos;
    expect(aluno.tipoEscola).toBe(TipoEscola.PARTICULAR);
  });

  it('Deve dar Erro de Aluno não encontrado', async () => {
    await expect(() => sut.execute(1, {})).rejects.toThrow(
      AlunoNaoEncontradoError,
    );
  });
});
