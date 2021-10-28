import { TipoUsuarioParam } from './tipo-voluntario.param.dto';
import { plainToClass } from 'class-transformer';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';

describe('TipoUsuarioParam', () => {
  let transformed: TipoUsuarioParam;

  beforeEach(() => {
    transformed = plainToClass(TipoUsuarioParam, {
      tipo: TipoUsuario.ATENDENTE.toString(),
    });
  });

  it('Deve ser Capaz de converter o tipo', async () => {
    expect(transformed.tipo).toBe(TipoUsuario.ATENDENTE);
  });
});
