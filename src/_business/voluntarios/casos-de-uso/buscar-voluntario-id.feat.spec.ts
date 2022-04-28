import { createMock } from '@golevelup/ts-jest';
import { VoluntarioOutput } from '../dtos/voluntario.dto';
import { IBuscarVoluntarioViaId } from '../services/voluntario.service';
import {
  BuscarVoluntarioViaId,
  VoluntarioNaoEncontradoError,
} from './buscar-voluntario.id.feat';

const ID_USUARIO_ESPERADO = 1;

class InMemoryVoluntarioService implements IBuscarVoluntarioViaId {
  public voluntarios: VoluntarioOutput[] = [
    {
      ...createMock<VoluntarioOutput>(),
      id: ID_USUARIO_ESPERADO,
    },
  ];
  async findById(id: number): Promise<VoluntarioOutput> {
    return Promise.resolve(
      this.voluntarios.find((voluntario) => voluntario.id === id),
    );
  }
}

describe('Buscar Voluntário', () => {
  let sut: BuscarVoluntarioViaId;
  let voluntarioService: InMemoryVoluntarioService;

  beforeEach(() => {
    voluntarioService = new InMemoryVoluntarioService();
    sut = new BuscarVoluntarioViaId(voluntarioService);
  });

  it('Deve lançar um erro caso voluntário não exista', async () => {
    const idVoluntarioInexistente = 99;

    await expect(() => sut.execute(idVoluntarioInexistente)).rejects.toThrow(
      VoluntarioNaoEncontradoError,
    );
  });

  it('Deve buscar um voluntário via id', async () => {
    const response = await sut.execute(ID_USUARIO_ESPERADO);
    expect(response).toEqual(
      expect.objectContaining({
        id: ID_USUARIO_ESPERADO,
      }),
    );
  });
});
