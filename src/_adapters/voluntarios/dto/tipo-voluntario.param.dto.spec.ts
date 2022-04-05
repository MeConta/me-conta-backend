import { VoluntarioParams, VoluntarioQuery } from './tipo-voluntario.param.dto';
import { plainToClass } from 'class-transformer';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { FrenteAtuacao } from '../../../_business/voluntarios/entidades/voluntario.entity';

describe('TipoUsuarioParam', () => {
  let transformed: VoluntarioParams;
  let queryParams: VoluntarioQuery;

  beforeEach(() => {
    transformed = plainToClass(VoluntarioParams, {
      tipo: TipoUsuario.ATENDENTE.toString(),
    });
    queryParams = plainToClass(VoluntarioQuery, {
      frente: FrenteAtuacao.COACHING_DE_ROTINA_DE_ESTUDOS,
    });
  });

  it('Deve ser Capaz de converter o tipo', async () => {
    expect(transformed.tipo).toBe(TipoUsuario.ATENDENTE);
  });

  it('Should be able to have a valid type', async () => {
    expect(queryParams.frente).toBe(
      FrenteAtuacao.COACHING_DE_ROTINA_DE_ESTUDOS,
    );
  });
});
