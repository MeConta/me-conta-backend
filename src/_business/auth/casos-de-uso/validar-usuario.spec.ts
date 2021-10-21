import { createMock } from '@golevelup/ts-jest';
import { ValidarUsuario } from './validar-usuario.feat';
import { IHashCompareService } from '../../usuarios/services/hash.service';
import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { IBuscarUsuarioViaEmailService } from '../../usuarios/services/usuario.service';

describe('Validar Usuário', () => {
  let sut: ValidarUsuario;
  const usuarioService = createMock<IBuscarUsuarioViaEmailService>();
  const hashService = createMock<IHashCompareService>();
  const usuario = {
    ...createMock<Usuario>(),
    id: 0,
    nome: 'Teste',
    email: 'teste@teste.com',
  } as Usuario;
  beforeEach(() => {
    sut = new ValidarUsuario(usuarioService, hashService);
  });
  beforeEach(() => {
    jest.spyOn(usuarioService, 'findByEmail').mockResolvedValue(usuario);
    jest.spyOn(hashService, 'compare').mockResolvedValue(true);
  });
  it('Deve retornar um usuário válido', async () => {
    const response = await sut.execute(expect.any(String), expect.any(String));
    expect(response).toEqual(
      expect.objectContaining({
        id: 0,
        nome: 'Teste',
        email: 'teste@teste.com',
      } as Usuario),
    );
  });

  it('Deve retornar null se o usuário não existir', async () => {
    jest.spyOn(usuarioService, 'findByEmail').mockResolvedValue(null);
    const response = await sut.execute(expect.any(String), expect.any(String));
    expect(response).toBeNull();
  });

  it('Deve retornar null se a senha for inválida', async () => {
    jest.spyOn(hashService, 'compare').mockResolvedValue(false);
    const response = await sut.execute(expect.any(String), expect.any(String));
    expect(response).toBeNull();
  });
});
