import { createMock } from '@golevelup/ts-jest';
import { IBuscarUsuarioViaEmail } from './buscar-usuario-email.feat';
import { UsuarioNaoEncontradoError } from '../erros/erros';
import { Usuario } from '../entidades/usuario.entity';

export interface IEmailOptions {
  to?: string;
  from?: string;
  subject?: string;
  template?: string;
  context?: any;
}

export interface ISendEmailService {
  send(options: IEmailOptions): Promise<void>;
}

interface EsquecimentoSenha {
  id: number;
  hash: string;
}

export interface ISalvarHashRecuperacaoService {
  salvar(input: EsquecimentoSenha): Promise<void>;
}

export interface IBuscarHashRecuperacaoService {
  buscar(id: number): Promise<EsquecimentoSenha>;
}

export interface ICriarHashRecuperacaoService {
  criarHash(): Promise<string>;
}

export class RecuperarSenha {
  constructor(
    private readonly usuarioService: IBuscarUsuarioViaEmail,
    private readonly recuperacaoService: ISalvarHashRecuperacaoService &
      IBuscarHashRecuperacaoService &
      ICriarHashRecuperacaoService,
    private readonly emailService: ISendEmailService,
    private readonly emailOptions: Pick<
      IEmailOptions,
      'from' | 'subject' | 'template'
    >,
  ) {}
  async execute(input: string) {
    const usuario = await this.usuarioService.findByEmail(input);
    if (!usuario?.email) {
      throw new UsuarioNaoEncontradoError();
    }
    const hash = await this.recuperacaoService.criarHash();
    await this.recuperacaoService.salvar({
      id: usuario.id,
      hash,
    });
    await this.emailService.send({
      ...this.emailOptions,
      to: usuario.email,
      context: {
        hash,
      },
    });
  }
}

describe('Recuperar senha', () => {
  let sut: RecuperarSenha;
  let usuarioService: IBuscarUsuarioViaEmail;
  let emailService: ISendEmailService;
  let recuperacaoService: ISalvarHashRecuperacaoService &
    IBuscarHashRecuperacaoService &
    ICriarHashRecuperacaoService;
  beforeEach(() => {
    usuarioService = createMock<IBuscarUsuarioViaEmail>();
    recuperacaoService = createMock<
      ISalvarHashRecuperacaoService &
        IBuscarHashRecuperacaoService &
        ICriarHashRecuperacaoService
    >();
    emailService = createMock<ISendEmailService>();

    sut = new RecuperarSenha(usuarioService, recuperacaoService, emailService, {
      from: 'test-from@teste.com',
      subject: 'E-mail de recuperação de senha',
      template: '<p>#{hash}</p>',
    });
  });

  beforeEach(async () => {
    jest.spyOn(usuarioService, 'findByEmail').mockResolvedValue({
      ...createMock<Usuario>(),
      email: 'teste@teste.com',
    } as Usuario);
    jest
      .spyOn(recuperacaoService, 'criarHash')
      .mockResolvedValue('unique_hash');
  });

  it('Deve ser definido', async () => {
    expect(sut).toBeDefined();
  });

  it('Deve mandar e-mail de recuperação', async () => {
    await sut.execute('teste@teste.com');
    expect(usuarioService.findByEmail).toBeCalledWith('teste@teste.com');
    expect(recuperacaoService.criarHash).toBeCalled();
    expect(emailService.send).toBeCalledWith(
      expect.objectContaining({
        to: 'teste@teste.com',
        context: {
          hash: 'unique_hash',
        },
      } as IEmailOptions),
    );
  });

  it('Deve dar erro de usuário não encontrado', async () => {
    jest.spyOn(usuarioService, 'findByEmail').mockResolvedValue(null);

    await expect(() => sut.execute('teste@teste.com')).rejects.toThrow(
      UsuarioNaoEncontradoError,
    );
  });
});
