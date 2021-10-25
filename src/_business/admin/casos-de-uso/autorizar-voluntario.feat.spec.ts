import { Bio, Voluntario } from '../../voluntarios/entidades/voluntario.entity';
import { createMock } from '@golevelup/ts-jest';
import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { TipoUsuario } from '../../usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import {
  AutorizarVoluntario,
  VoluntarioNaoEncontradoError,
} from './autorizar-voluntario.feat';
import {
  IAtualizarAprovacaoVoluntario,
  IBuscarVoluntarioViaId,
} from '../../voluntarios/services/voluntario.service';

class InMemoryVoluntarioService
  implements IBuscarVoluntarioViaId, IAtualizarAprovacaoVoluntario
{
  public voluntarios: (Voluntario & Bio)[] = [
    {
      ...createMock<Voluntario & Bio>(),
      usuario: { ...createMock<Usuario>(), id: 0, tipo: TipoUsuario.ATENDENTE },
    },
  ];
  async findById(id: number): Promise<Voluntario & Bio> {
    return Promise.resolve(
      this.voluntarios.find((voluntario) => voluntario.usuario.id === id),
    );
  }

  async atualizarAprovacao(id: number, aprovado: boolean): Promise<void> {
    const index = this.voluntarios.findIndex(
      (voluntario) => voluntario.usuario.id === id,
    );
    this.voluntarios[index].aprovado = aprovado;
  }
}

describe('Autorizar voluntário', () => {
  let sut: AutorizarVoluntario;
  let service: InMemoryVoluntarioService;

  beforeEach(async () => {
    service = new InMemoryVoluntarioService();
    sut = new AutorizarVoluntario(service);
  });

  it('Deve ser definido', async () => {
    expect(sut).toBeDefined();
  });

  it('Deve autorizar um voluntário', async () => {
    await sut.execute(0, true);
    const { aprovado } = service.voluntarios[0];
    expect(aprovado).toBeTruthy();
  });

  it('Deve negar um voluntário', async () => {
    await sut.execute(0, false);
    const { aprovado } = service.voluntarios[0];
    expect(aprovado).toBeFalsy();
  });

  it('Deve dar erro de voluntário não encontrado', async () => {
    await expect(() => sut.execute(1, true)).rejects.toThrow(
      VoluntarioNaoEncontradoError,
    );
  });
});
