import { createMock } from '@golevelup/ts-jest';
import { Usuario } from '../entidades/usuario.entity';
import {
  BuscarUsuarioViaId,
  IBuscarUsuarioViaId,
} from './buscar-usuario.id.feat';

describe('Buscar Usuário', () => {
  let usuarioService: IBuscarUsuarioViaId;
  let sut: BuscarUsuarioViaId;
  beforeEach(() => {
    usuarioService = createMock<IBuscarUsuarioViaId>();
    sut = new BuscarUsuarioViaId(usuarioService);
  });

  beforeEach(() => {
    const usuario = {
      ...createMock<Usuario>(),
      id: 0,
    };
    jest.spyOn(usuarioService, 'findById').mockResolvedValue(usuario);
  });

  it('Deve buscar um usuário via e-mail', async () => {
    const response = await sut.execute(0);
    expect(response).toEqual(
      expect.objectContaining({
        id: 0,
      }),
    );
  });
});
