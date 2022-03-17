import { createMock } from '@golevelup/ts-jest';
import { ValidarUsuarioComRefreshToken } from './validar-usuario-com-refresh-token.feat';
import { IHashCompareService } from '../../usuarios/services/hash.service';
import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { IBuscarUsuarioViaId } from '../../../_business/usuarios/casos-de-uso/buscar-usuario.id.feat';

describe('Validar Usuário', () => {
  let sut: ValidarUsuarioComRefreshToken;
  const usuarioService = createMock<IBuscarUsuarioViaId>();
  const hashService = createMock<IHashCompareService>();
  const usuario = {
    ...createMock<Usuario>(),
    id: 23,
    nome: 'Teste User',
    email: 'teste-user@teste.com',
    refreshTokenHashed: 'hashed-refresh-token',
  } as Usuario;
  beforeEach(() => {
    sut = new ValidarUsuarioComRefreshToken(usuarioService, hashService);
  });
  beforeEach(() => {
    jest.spyOn(usuarioService, 'findById').mockResolvedValue(usuario);
    jest.spyOn(hashService, 'compare').mockResolvedValue(true);
  });
  it('Deve retornar um usuário válido', async () => {
    const response = await sut.execute(expect.any(String), expect.any(Number));
    expect(response).toEqual(
      expect.objectContaining({
        id: 23,
        nome: 'Teste User',
        email: 'teste-user@teste.com',
      } as Usuario),
    );
  });

  it('Deve retornar null se os tokens não derem match', async () => {
    jest.spyOn(hashService, 'compare').mockResolvedValue(false);
    const response = await sut.execute(expect.any(String), expect.any(Number));
    expect(response).toBeNull();
  });
});
