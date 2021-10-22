import { createMock } from '@golevelup/ts-jest';
import { ICadastrarPerfilService } from '../../perfil/services/cadastrar-perfil.service';
import { CadastrarAluno } from './cadastrar-aluno.feat';
import { Aluno, NovoAluno } from '../entidades/aluno.entity';
import { ICadastrarNovoAlunoService } from '../services/alunos.service';
import { IBuscarUsuarioViaId } from '../../usuarios/casos-de-uso/buscar-usuario.id.feat';
import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { TipoUsuario } from '../../usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import {
  UsuarioInvalidoError,
  UsuarioNaoEncontradoError,
} from '../../usuarios/erros/erros';

class InMemoryAlunoService implements ICadastrarNovoAlunoService {
  public alunos: Aluno[] = [];
  cadastrar(aluno: NovoAluno): Promise<void> {
    this.alunos.push({
      ...aluno,
    });
    return Promise.resolve();
  }
}

describe('Cadastrar novo Aluno', () => {
  let sut: CadastrarAluno;
  let alunoService: InMemoryAlunoService;
  let usuarioService: IBuscarUsuarioViaId;
  let perfilService: ICadastrarPerfilService;

  const request = createMock<NovoAluno>();
  const usuario: Usuario = {
    ...createMock<Usuario>(),
    tipo: TipoUsuario.ALUNO,
  };

  beforeEach(async () => {
    alunoService = new InMemoryAlunoService();
    perfilService = createMock<ICadastrarPerfilService>();
    usuarioService = createMock<IBuscarUsuarioViaId>();
    sut = new CadastrarAluno(usuarioService, perfilService, alunoService);
  });
  beforeEach(async () => {
    jest.spyOn(usuarioService, 'findById').mockResolvedValue(usuario);
  });
  it('Deve ser Definido', () => {
    expect(sut).toBeDefined();
  });
  it('Deve cadastrar um Aluno', async () => {
    await sut.execute(request);
    expect(alunoService.alunos[0]).toBeDefined();
  });
  it('Não deve cadastrar se o  usuário não existir', async () => {
    jest.spyOn(usuarioService, 'findById').mockResolvedValue(null);
    await expect(() => sut.execute(request)).rejects.toThrow(
      UsuarioNaoEncontradoError,
    );
  });
  it('Não deve cadastrar um usuário que não seja aluno', async () => {
    jest.spyOn(usuarioService, 'findById').mockResolvedValue({
      ...usuario,
      tipo: TipoUsuario.SUPERVISOR,
    });
    await expect(() => sut.execute(request)).rejects.toThrow(
      UsuarioInvalidoError,
    );
  });
});
