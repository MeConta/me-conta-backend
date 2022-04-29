import { FrenteAtuacao, Voluntario } from '../entidades/voluntario.entity';
import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { TipoUsuario } from '../../usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { createMock } from '@golevelup/ts-jest';
import { ListarVoluntarios } from './listar-voluntarios.feat';
import { IBuscarVoluntarios } from '../services/voluntario.service';
import { ITokenUser } from '../../auth/interfaces/auth';
import { VoluntarioOutput } from '../dtos/voluntario.dto';

class InMemoryVoluntarioService implements IBuscarVoluntarios {
  voluntarios: VoluntarioOutput[] = [
    { aprovado: true, frentes: [0] },
    { aprovado: false, frentes: [2] },
    { aprovado: true, frentes: [1, 2] },
    null,
  ].map<VoluntarioOutput>((voluntario, index) => ({
    ...createMock<VoluntarioOutput>(),
    aprovado: voluntario?.aprovado,
    frentes: voluntario?.frentes,
    usuario: {
      ...createMock<Usuario>(),
      tipo: TipoUsuario.ATENDENTE,
      id: index,
    },
  }));

  async buscar(search?: Partial<Voluntario>): Promise<VoluntarioOutput[]> {
    if (search?.frentes) {
      this.voluntarios = this.voluntarios.filter((voluntario) =>
        voluntario.frentes?.some((v) => search.frentes.includes(v)),
      );
    }

    if (search?.aprovado && search?.usuario?.tipo) {
      return this.voluntarios.filter(
        (voluntario) =>
          search.aprovado === voluntario.aprovado &&
          search.usuario.tipo === voluntario.usuario.tipo,
      );
    } else if (search?.aprovado) {
      return this.voluntarios.filter(
        (voluntario) => search.aprovado === voluntario.aprovado,
      );
    } else if (search?.usuario?.tipo) {
      return this.voluntarios.filter(
        (voluntario) => search.usuario.tipo === voluntario.usuario.tipo,
      );
    }
    return this.voluntarios;
  }
}

describe('Listagem de voluntários', () => {
  let sut: ListarVoluntarios;
  let voluntarioService: IBuscarVoluntarios;

  beforeEach(async () => {
    voluntarioService = new InMemoryVoluntarioService();
    sut = new ListarVoluntarios(voluntarioService);
  });

  it('Deve ser definido', () => {
    expect(sut).toBeDefined();
  });

  it('Deve retornar os voluntários ativos e com dados ofuscados quando o requisitante não for administrador', async () => {
    const [response] = await sut.execute({
      user: {
        roles: [TipoUsuario.ALUNO],
      } as ITokenUser,
    });
    expect(response).toBeDefined();
    expect(response).not.toHaveProperty('aprovado');
  });

  it('Deve retornar os voluntários ativos de determinado tipo e com dados ofuscados quando o requisitante não for administrador', async () => {
    const response = await sut.execute({
      user: {
        roles: [TipoUsuario.ALUNO],
      } as ITokenUser,
      tipo: TipoUsuario.ATENDENTE,
    });
    expect(response).toHaveLength(2);
  });

  it('Deve retornar os voluntários para sessão de acolhimento', async () => {
    const response = await sut.execute({
      user: {
        roles: [TipoUsuario.ALUNO],
      } as ITokenUser,
      tipo: TipoUsuario.ATENDENTE,
      frenteAtuacao: FrenteAtuacao.SESSAO_ACOLHIMENTO,
    });
    expect(response).toHaveLength(1);
    expect(response[0]).toEqual(expect.objectContaining({ frentes: [0] }));
  });

  it('Deve retornar Todos os voluntários quando o requisitante for administrador', async () => {
    const response = await sut.execute({
      user: {
        roles: [TipoUsuario.ADMINISTRADOR],
      } as ITokenUser,
    });
    expect(response).toHaveLength(4);
  });

  it('Deve retornar Todos os voluntários de determinado tipo quando o requisitante for administrador', async () => {
    const response = await sut.execute({
      user: {
        roles: [TipoUsuario.ADMINISTRADOR],
      } as ITokenUser,
      tipo: TipoUsuario.ATENDENTE,
    });
    expect(response).toHaveLength(4);
  });
});
