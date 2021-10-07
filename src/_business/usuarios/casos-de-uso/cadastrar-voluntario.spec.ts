import { Estado, Genero, Perfil, Usuario } from '../entidades/usuario.entity';
import {
  CadastrarVoluntario,
  FrenteAtuacao,
  ICadastrarNovoVoluntarioService,
  NovoVoluntario,
  Voluntario,
  UsuarioNaoEncontradoError,
  UsuarioInvalidoError,
} from './cadastrar-voluntario.feat';
import { IBuscarUsuarioViaId } from './buscar-usuario.id.feat';
import { createMock } from '@golevelup/ts-jest';
import { TipoUsuario } from './cadastrar-novo-usuario.feat';

// ---
class InMemoryVoluntarioService implements ICadastrarNovoVoluntarioService {
  voluntarios: NovoVoluntario[] = [];
  async cadastrar(aluno: NovoVoluntario): Promise<void> {
    this.voluntarios.push({
      ...aluno,
      usuario: {
        id: this.voluntarios.length,
        ...createMock<Usuario>(),
      },
    });
    return Promise.resolve();
  }
}

describe('Cadastrar nova Aluna', () => {
  let sut: CadastrarVoluntario;
  let usuarioService: IBuscarUsuarioViaId;
  let voluntarioService: InMemoryVoluntarioService;

  const perfil: Perfil = {
    telefone: '(11) 91234-5678',
    dataNascimento: new Date(1996, 7, 12),
    cidade: 'Acrelândia',
    estado: Estado.AC,
    genero: Genero.PREFIRO_NAO_DECLARAR,
  };
  const request: NovoVoluntario = {
    ...perfil,
    instituicao: 'Teste',
    formado: true,
    frentes: [FrenteAtuacao.SESSAO_ACOLHIMENTO],
    usuario: {
      ...createMock<Usuario>(),
      id: 0,
    },
  };
  beforeEach(async () => {
    usuarioService = createMock<IBuscarUsuarioViaId>();
    voluntarioService = new InMemoryVoluntarioService();
    sut = new CadastrarVoluntario(voluntarioService, usuarioService);
  });
  it('Deve ser Definido', async () => {
    expect(sut).toBeDefined();
  });
  it('Deve cadastrar um novo voluntario', async () => {
    await sut.execute(request);
    expect(voluntarioService.voluntarios[0]).toEqual(
      expect.objectContaining({
        ...request,
      } as Voluntario),
    );
  });
  it('Deve dar erro de usuário não encontrado', async () => {
    jest.spyOn(usuarioService, 'findById').mockResolvedValue(null);
    await expect(() => sut.execute(request)).rejects.toThrow(
      UsuarioNaoEncontradoError,
    );
  });
  it('Deve dar erro se o usuário não for um voluntário', async () => {
    jest.spyOn(usuarioService, 'findById').mockResolvedValue({
      ...createMock<Usuario>(),
      tipo: TipoUsuario.ALUNO,
    });
    await expect(() => sut.execute(request)).rejects.toThrow(
      UsuarioInvalidoError,
    );
  });
});
