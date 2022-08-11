import { GerarToken } from './gerar-token.feat';
import { createMock } from '@golevelup/ts-jest';
import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { IJwtService } from '../interfaces/jwt.service';

describe('Gerar Token', () => {
  let sut: GerarToken;
  const jwtService = createMock<IJwtService>();
  const usuario = createMock<Usuario>();
  beforeEach(() => {
    sut = new GerarToken(jwtService);
  });
  beforeEach(() => {
    jest.spyOn(jwtService, 'sign').mockReturnValue('TOKEN');
  });
  it('Deve chamar a função de assinatura de token', function () {
    const permissaoNavegar = true;
    const teste = jest.spyOn(jwtService, 'sign').mockReturnValue('TOKEN');

    const response = sut.execute(usuario, permissaoNavegar);

    expect(response).toEqual(
      expect.objectContaining({
        token: 'TOKEN',
        refreshToken: 'TOKEN',
        perfilCompleto: false,
      }),
    );
    expect(teste).toHaveBeenCalledWith(
      {
        email: usuario.email,
        sub: usuario.id,
        roles: [usuario.tipo],
        permissaoNavegar,
      },
      expect.anything(),
    );
    expect(response).toHaveProperty('perfilCompleto');
  });
});
