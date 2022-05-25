import { createMock } from '@golevelup/ts-jest';
import { AlunoDbEntity } from 'src/_adapters/alunos/entidades/aluno.db.entity';
import { NovoAluno } from '../entidades/aluno.entity';
import { IBuscarAlunoViaId } from '../services/alunos.service';
import {
  BuscarAlunoViaId,
  AlunoNaoEncontradoError,
} from './buscar-aluno.id.feat';

const ID_USUARIO_ESPERADO = 2;

class InMemoryAlunoService implements IBuscarAlunoViaId {
  public alunos: AlunoDbEntity[] = [
    {
      ...createMock<AlunoDbEntity>(),
      id: ID_USUARIO_ESPERADO,
    },
  ];
  async findById(id: number): Promise<NovoAluno> {
    return Promise.resolve(this.alunos.find((aluno) => aluno.id === id));
  }
}

describe('Buscar Aluno', () => {
  let sut: BuscarAlunoViaId;
  let alunoService: InMemoryAlunoService;

  beforeEach(() => {
    alunoService = new InMemoryAlunoService();
    sut = new BuscarAlunoViaId(alunoService);
  });

  it.skip('Deve lançar um erro caso aluno não exista', async () => {
    const idAlunoInexistente = 99;

    await expect(() => sut.execute(idAlunoInexistente)).rejects.toThrow(
      new AlunoNaoEncontradoError(),
    );
  });
  it('Deve buscar um aluno via id', async () => {
    const response = await sut.execute(ID_USUARIO_ESPERADO);
    expect(response).toEqual(
      expect.objectContaining({
        id: ID_USUARIO_ESPERADO,
      }),
    );
  });
});
