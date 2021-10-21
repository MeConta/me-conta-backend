import { BuscarUsuarioEmail } from './buscar-usuario-email.feat';
import { createMock } from '@golevelup/ts-jest';
import { Usuario } from '../entidades/usuario.entity';
import { IBuscarUsuarioViaEmailService } from '../services/usuario.service';

describe('Buscar Usuário', () => {
  let usuarioService: IBuscarUsuarioViaEmailService;
  let sut: BuscarUsuarioEmail;
  beforeEach(() => {
    usuarioService = createMock<IBuscarUsuarioViaEmailService>();
    sut = new BuscarUsuarioEmail(usuarioService);
  });

  beforeEach(() => {
    const usuario = {
      ...createMock<Usuario>(),
      email: `teste@teste.com`,
    };
    jest.spyOn(usuarioService, 'findByEmail').mockResolvedValue(usuario);
  });

  it('Deve buscar um usuário via e-mail', async () => {
    const response = await sut.execute(`teste@teste.com`);
    expect(response).toEqual(
      expect.objectContaining({
        email: `teste@teste.com`,
      }),
    );
  });
});
