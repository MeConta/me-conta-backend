import { Recuperacao } from '../entidades/recuperacao.entity';
import { createMock } from '@golevelup/ts-jest';
import { DEFAULT_PASSWORD } from '../../../../jest.setup';
import { IAtualizarUsuarioService } from '../../usuarios/services/usuario.service';
import { Usuario } from '../../usuarios/entidades/usuario.entity';
import {
  RecuperacaoExpiradaError,
  RecuperacaoNotFoundError,
  ResetSenha,
} from './reset-senha.feat';
import {
  IBuscarRecuperacaoService,
  IRemoverRecuperacaoService,
} from '../services/recuperacao.service';
import { IHashHashService } from '../../usuarios/services/hash.service';
import { IDateGreaterThanService } from '../../agenda/interfaces/date-time.service';

describe('Reset de Senha', () => {
  let sut: ResetSenha;
  let recuperacaoService: IBuscarRecuperacaoService &
    IRemoverRecuperacaoService;
  let usuarioService: IAtualizarUsuarioService;
  let hashService: IHashHashService;
  let dateService: IDateGreaterThanService;
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
    dateService = createMock<IDateGreaterThanService>();
    sut = new ResetSenha(
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
      usuario: {
        ...createMock<Usuario>(),
        id: 1,
      },
    });
    jest.spyOn(dateService, 'dateGreaterThan').mockReturnValue(false);
  });
  it('Deve trocar a senha de um usuário', async () => {
    await sut.execute(request);
    expect(recuperacaoService.findByHash).toBeCalledWith('MOCKED_HASH');
    expect(usuarioService.atualizar).toBeCalledWith(expect.any(Number), {
      senha: request.senha,
    });
  });
  it('Deve dar erro ao tentar trocar uma senha com hash inválida ou inexistente', async () => {
    jest.spyOn(recuperacaoService, 'findByHash').mockResolvedValue(null);
    await expect(() => sut.execute(request)).rejects.toThrow(
      RecuperacaoNotFoundError,
    );
  });
  it('Deve dar erro ao tentar trocar uma senha com hash expirada', async () => {
    jest.spyOn(dateService, 'dateGreaterThan').mockReturnValue(true);
    await expect(() => sut.execute(request)).rejects.toThrow(
      RecuperacaoExpiradaError,
    );
  });
});
