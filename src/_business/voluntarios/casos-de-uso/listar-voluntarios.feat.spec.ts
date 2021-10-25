import { Bio, Voluntario } from '../entidades/voluntario.entity';
import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { TipoUsuario } from '../../usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { createMock } from '@golevelup/ts-jest';
import { ListarVoluntarios } from './listar-voluntarios.feat';
import { IBuscarVoluntarios } from '../services/voluntario.service';
import { ITokenUser } from '../../auth/interfaces/auth';

class InMemoryVoluntarioService implements IBuscarVoluntarios {
  voluntarios: (Voluntario & Bio)[] = [true, false, null].map<Voluntario & Bio>(
    (aprovado, index) => ({
      ...createMock<Voluntario & Bio>(),
      aprovado,
      usuario: {
        ...createMock<Usuario>(),
        tipo: TipoUsuario.ATENDENTE,
        id: index,
      },
    }),
  );
  async buscar(search?: Partial<Voluntario>): Promise<(Voluntario & Bio)[]> {
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
      roles: [TipoUsuario.ALUNO],
    } as ITokenUser);
    console.log('RESPONSE', response);
    expect(response).toBeDefined();
    expect(response).not.toHaveProperty('aprovado');
  });

  it('Deve retornar os voluntários ativos de determinado tipo e com dados ofuscados quando o requisitante não for administrador', async () => {
    const response = await sut.execute(
      {
        roles: [TipoUsuario.ALUNO],
      } as ITokenUser,
      TipoUsuario.ATENDENTE,
    );
    expect(response).toHaveLength(1);
  });

  it('Deve retornar Todos os voluntários quando o requisitante for administrador', async () => {
    const response = await sut.execute({
      roles: [TipoUsuario.ADMINISTRADOR],
    } as ITokenUser);
    expect(response).toHaveLength(3);
  });

  it('Deve retornar Todos os voluntários de determinado tipo quando o requisitante for administrador', async () => {
    const response = await sut.execute(
      {
        roles: [TipoUsuario.ADMINISTRADOR],
      } as ITokenUser,
      TipoUsuario.ATENDENTE,
    );
    expect(response).toHaveLength(3);
  });
});
