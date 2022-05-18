import { Recuperacao } from '../entidades/recuperacao.entity';
import { createMock } from '@golevelup/ts-jest';
import { DEFAULT_PASSWORD } from '../../../../jest.setup';
import { IAtualizarUsuarioService } from '../../usuarios/services/usuario.service';
import { Usuario } from '../../usuarios/entidades/usuario.entity';
import {
  RecuperacaoExpiradaError,
  RecuperacaoNotFoundError,
} from './reset-senha.feat';
import {
  IBuscarRecuperacaoService,
  IRemoverRecuperacaoService,
} from '../services/recuperacao.service';
import { IHashHashService } from '../../usuarios/services/hash.service';
import { IDateGreaterThan } from '../../agenda/services/date-time.service';
import { ValidaHash } from './validar-hash.feat';

describe('Validaçao da Hash', () => {
  let sut: ValidaHash;
  let recuperacaoService: IBuscarRecuperacaoService &
    IRemoverRecuperacaoService;
  let usuarioService: IAtualizarUsuarioService;
  let hashService: IHashHashService;
  let dateService: IDateGreaterThan;
  const request = {
    hash: 'MOCKED_HASH',
    senha: DEFAULT_PASSWORD,
  };
  beforeEach(async () => {
    recuperacaoService = createMock<
      IBuscarRecuperacaoService & IRemoverRecuperacaoService
    >();
    usuarioService = createMock<IAtualizarUsuarioService>();
    hashService = createMock<IHashHashService>();
    dateService = createMock<IDateGreaterThan>();
    sut = new ValidaHash(
      recuperacaoService,
      usuarioService,
      hashService,
      dateService,
    );
  });
  it('Deve ser definido', () => {
    expect(sut).toBeDefined();
  });
  beforeEach(async () => {
    jest.spyOn(recuperacaoService, 'findByHash').mockResolvedValue({
      ...createMock<Recuperacao>(),
      //hash: 'MOCKED_HASH',
      usuario: {
        ...createMock<Usuario>(),
        id: 1,
      },
    });
    jest.spyOn(dateService, 'greaterThan').mockReturnValue(false);
  });
  it('Deve dar erro ao tentar trocar uma senha com hash inválida ou inexistente', async () => {
    jest.spyOn(recuperacaoService, 'findByHash').mockResolvedValue(null);
    await expect(() => sut.execute(request.hash)).rejects.toThrow(
      new RecuperacaoNotFoundError(),
    );
  });
  it('Deve dar erro ao tentar trocar uma senha com hash expirada', async () => {
    jest.spyOn(dateService, 'greaterThan').mockReturnValue(true);
    await expect(() => sut.execute(request.hash)).rejects.toThrow(
      new RecuperacaoExpiradaError(),
    );
  });
});
