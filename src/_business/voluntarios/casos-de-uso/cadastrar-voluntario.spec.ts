import {
  Estado,
  Genero,
  Perfil,
  Usuario,
} from '../../usuarios/entidades/usuario.entity';
import {
  CadastrarVoluntario,
  CamposDeFormacaoError,
  ICadastrarNovoVoluntarioService,
  NovoVoluntario,
} from './cadastrar-voluntario.feat';
import { IBuscarUsuarioViaId } from '../../usuarios/casos-de-uso/buscar-usuario.id.feat';
import { createMock } from '@golevelup/ts-jest';
import { TipoUsuario } from '../../usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import {
  AreaAtuacao,
  FrenteAtuacao,
  Voluntario,
} from '../entidades/voluntario.entity';
import { ICadastrarPerfilService } from '../../perfil/interfaces/cadastrar-perfil.service';
import {
  UsuarioInvalidoError,
  UsuarioNaoEncontradoError,
} from '../../usuarios/erros/erros';

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

describe('Cadastrar novo Voluntário', () => {
  let sut: CadastrarVoluntario;
  let usuarioService: IBuscarUsuarioViaId;
  let voluntarioService: InMemoryVoluntarioService;
  let perfilService: ICadastrarPerfilService;

  const perfil: Perfil = {
    telefone: '11912345678',
    dataNascimento: new Date(1996, 7, 12),
    cidade: 'Acrelândia',
    estado: Estado.AC,
    genero: Genero.PREFIRO_NAO_DECLARAR,
    usuario: createMock<Usuario>(),
  };
  const request: NovoVoluntario = {
    ...perfil,
    instituicao: 'Teste',
    formado: false,
    frentes: [FrenteAtuacao.SESSAO_ACOLHIMENTO],
    usuario: {
      ...createMock<Usuario>(),
      id: 0,
    },
  };
  beforeEach(async () => {
    usuarioService = createMock<IBuscarUsuarioViaId>();
    perfilService = createMock<ICadastrarPerfilService>();
    voluntarioService = new InMemoryVoluntarioService();
    sut = new CadastrarVoluntario(
      voluntarioService,
      usuarioService,
      perfilService,
    );
  });

  beforeEach(async () => {
    jest
      .spyOn(usuarioService, 'findById')
      .mockResolvedValue(createMock<Usuario>());
    jest.spyOn(perfilService, 'cadastrar').mockResolvedValue();
  });

  it('Deve ser Definido', async () => {
    expect(sut).toBeDefined();
  });

  it('Deve cadastrar um novo voluntario em formação', async () => {
    await sut.execute({ ...request, formado: false, semestre: 2 });
    expect(voluntarioService.voluntarios[0]).toEqual(
      expect.objectContaining({
        ...request,
        formado: false,
        semestre: 2,
      } as Voluntario),
    );
  });

  it('Deve cadastrar um novo voluntario formado', async () => {
    await sut.execute({
      ...request,
      formado: true,
      anoFormacao: 2020,
      crp: 'CRP',
      areaAtuacao: AreaAtuacao.PROFESSOR,
      especializacoes: 'especialização',
    });
    expect(voluntarioService.voluntarios[0]).toEqual(
      expect.objectContaining({
        ...request,
        formado: true,
        anoFormacao: 2020,
        crp: 'CRP',
        areaAtuacao: AreaAtuacao.PROFESSOR,
        especializacoes: 'especialização',
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

  it('Deve dar erro se ele for formado e não especificar os campos', async () => {
    await expect(() =>
      sut.execute({
        ...request,
        formado: true,
        anoFormacao: null,
        instituicao: null,
        areaAtuacao: AreaAtuacao.PSICOLOGO,
        crp: null,
      }),
    ).rejects.toThrow(CamposDeFormacaoError);
  });
  it('Deve dar erro se ele não for formado e não especificar o semestre', async () => {
    await expect(() =>
      sut.execute({
        ...request,
        formado: false,
        semestre: null,
      }),
    ).rejects.toThrow(CamposDeFormacaoError);
  });
});
