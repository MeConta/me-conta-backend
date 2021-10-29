import { Aluno, Motivos, TipoEscola } from '../entidades/aluno.entity';
import { createMock } from '@golevelup/ts-jest';
import {
  AlunoNaoEncontradoError,
  AtualizarAluno,
  IBuscarAlunoViaId,
} from './atualizar-aluno.feat';
import { CadastrarAluno } from './cadastrar-aluno.feat';
import { Perfil } from '../../usuarios/entidades/usuario.entity';
import { IBuscarPerfilByIdService } from '../../perfil/services/perfil.service';

/*class InMemoryAlunoService implements IBuscarAlunoViaId {
  alunos: (Aluno & Perfil & Motivos)[] = [];
  findById(id: number): Promise<Aluno & Perfil & Motivos> {
    return Promise.resolve(this.alunos[id]);
  }
}*/

describe('Atualizar Aluno', function () {
  const alunos: (Aluno & Perfil & Motivos)[] = [];
  let sut: AtualizarAluno;
  let alunoService: IBuscarAlunoViaId;
  let perfilService: IBuscarPerfilByIdService;
  const cadastroAluno = createMock<CadastrarAluno>();

  beforeEach(async () => {
    alunoService = createMock<IBuscarAlunoViaId>();
    perfilService = createMock<IBuscarPerfilByIdService>();
    alunos[0] = {
      ...createMock<Aluno & Perfil & Motivos>(),
      tipoEscola: TipoEscola.PUBLICA,
    };
    sut = new AtualizarAluno(alunoService, perfilService, cadastroAluno);
  });

  beforeEach(async () => {
    jest
      .spyOn(alunoService, 'findById')
      .mockResolvedValue(createMock<Aluno & Perfil & Motivos>());
    jest
      .spyOn(perfilService, 'findById')
      .mockResolvedValue(createMock<Perfil>());

    jest.spyOn(cadastroAluno, 'execute').mockImplementation(async (args) => {
      alunos[0] = { ...args };
    });
  });

  it('Deve ser definido', async () => {
    expect(sut).toBeDefined();
  });

  it('Deve alterar informações do Aluno', async () => {
    await sut.execute(0, {
      tipoEscola: TipoEscola.PARTICULAR,
    });
    const [aluno] = alunos;
    expect(aluno.tipoEscola).toBe(TipoEscola.PARTICULAR);
  });

  describe('Deve dar Erro de Aluno não encontrado', () => {
    it('Não há Aluno cadastrado', async () => {
      jest.spyOn(alunoService, 'findById').mockResolvedValue(null);
    });
    it('Não há Perfil cadastrado', async () => {
      jest.spyOn(perfilService, 'findById').mockResolvedValue(null);
    });
    afterEach(async () => {
      await expect(() => sut.execute(1, {})).rejects.toThrow(
        AlunoNaoEncontradoError,
      );
    });
  });
});
