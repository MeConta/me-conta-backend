import { GerarToken, IJwtService } from './gerar-token.feat';
import { createMock } from '@golevelup/ts-jest';
import { Usuario } from '../../usuarios/entidades/usuario.entity';

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
    const response = sut.execute(usuario);
    expect(response).toEqual(
      expect.objectContaining({
        token: 'TOKEN',
      }),
    );
  });
});
