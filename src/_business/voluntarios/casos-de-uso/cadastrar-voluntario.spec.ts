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
import {
  UsuarioInvalidoError,
  UsuarioNaoEncontradoError,
} from '../../usuarios/erros/usuarios.errors';
import { IAtualizarUsuarioService } from '../../usuarios/services/usuario.service';
import { ICadastrarPerfilService } from '../../perfil/services/perfil.service';

// ---
class InMemoryVoluntarioService implements ICadastrarNovoVoluntarioService {
  voluntarios: NovoVoluntario[] = [];
  async cadastrar(voluntario: NovoVoluntario): Promise<void> {
    this.voluntarios.push({
      ...voluntario,
      usuario: {
        ...createMock<Usuario>(),
        ...voluntario.usuario,
        tipo: voluntario.tipo,
        id: this.voluntarios.length,
      } as Usuario,
    });
    return Promise.resolve();
  }
}

describe('Cadastrar novo Voluntário', () => {
  let sut: CadastrarVoluntario;
  let usuarioService: IBuscarUsuarioViaId & IAtualizarUsuarioService;
  let voluntarioService: InMemoryVoluntarioService;
  let perfilService: ICadastrarPerfilService;

  const perfil: Perfil = {
    telefone: '11912345678',
    dataNascimento: new Date(1996, 7, 12),
    cidade: 'Acrelândia',
    UF: Estado.AC,
    genero: Genero.PREFIRO_NAO_DECLARAR,
    usuario: createMock<Usuario>(),
  };
  const request: NovoVoluntario = {
    ...perfil,
    instituicao: 'Teste',
    formado: false,
    semestre: 10,
    frentes: [FrenteAtuacao.SESSAO_ACOLHIMENTO],
    usuario: {
      ...createMock<Usuario>(),
      id: 0,
    },
  };
  beforeEach(async () => {
    usuarioService = createMock<
      IBuscarUsuarioViaId & IAtualizarUsuarioService
    >();
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
      .mockResolvedValue({ id: 1, ...createMock<Usuario>() } as Usuario);
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
        semestre: null,
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

  it('Deve ser capaz de alterar o tipo de usuário', async () => {
    jest.spyOn(usuarioService, 'findById').mockResolvedValue({
      ...createMock<Usuario>(),
      id: 1,
      tipo: TipoUsuario.ATENDENTE,
    });
    jest.spyOn(usuarioService, 'atualizar').mockResolvedValue({
      ...createMock<Usuario>(),
      tipo: TipoUsuario.SUPERVISOR,
    });
    request.tipo = TipoUsuario.SUPERVISOR;

    const { tipo, ...response } = request;

    await sut.execute({
      ...request,
      formado: true,
      anoFormacao: 2020,
      crp: 'CRP',
      areaAtuacao: AreaAtuacao.PROFESSOR,
      especializacoes: 'especialização',
      tipo,
    });
    expect(usuarioService.atualizar).toBeCalledWith(
      expect.any(Number),
      expect.objectContaining({
        tipo,
      }),
    );
    expect(voluntarioService.voluntarios[0]).toEqual(
      expect.objectContaining({
        ...response,
        frentes: expect.any(Array),
        formado: true,
        semestre: null,
        anoFormacao: 2020,
        crp: 'CRP',
        areaAtuacao: AreaAtuacao.PROFESSOR,
        especializacoes: 'especialização',
        usuario: expect.objectContaining({
          tipo,
        }),
      } as Voluntario),
    );
  });
});
