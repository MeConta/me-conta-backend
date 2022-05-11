import { createMock } from '@golevelup/ts-jest';
import { UsuarioNaoEncontradoError } from '../../usuarios/erros/usuarios.errors';
import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { RecuperarSenha } from './recuperar-senha.feat';
import { ISalvarHashRecuperacaoService } from '../services/recuperacao.service';
import {
  EmailOptions,
  EMailSendError,
  ISendEmailService,
} from '../../mail/services/mail.service';
import { IHashGenerateRandomString } from '../../usuarios/services/hash.service';
import { IBuscarUsuarioViaEmailService } from '../../usuarios/services/usuario.service';
import { IDateAdd } from '../../agenda/services/date-time.service';

describe('Recuperar senha', () => {
  let sut: RecuperarSenha;
  let usuarioService: IBuscarUsuarioViaEmailService;
  let emailService: ISendEmailService;
  let recuperacaoService: ISalvarHashRecuperacaoService &
    IHashGenerateRandomString;
  let dateService: IDateAdd;
  beforeEach(() => {
    usuarioService = createMock<IBuscarUsuarioViaEmailService>();
    recuperacaoService = createMock<
      ISalvarHashRecuperacaoService & IHashGenerateRandomString
    >();
    dateService = createMock<IDateAdd>();
    emailService = createMock<ISendEmailService>();

    sut = new RecuperarSenha(
      usuarioService,
      recuperacaoService,
      dateService,
      emailService,
      {
        subject: 'E-mail de recuperação de senha',
        template: '<p>#{hash}</p>',
      },
    );
  });

  beforeEach(async () => {
    jest.spyOn(usuarioService, 'findByEmail').mockResolvedValue({
      ...createMock<Usuario>(),
      nome: 'João Mota',
      email: 'teste@teste.com',
    } as Usuario);
    jest
      .spyOn(recuperacaoService, 'randomString')
      .mockReturnValue('unique_hash');
  });

  it('Deve ser definido', async () => {
    expect(sut).toBeDefined();
  });

  it('Deve mandar e-mail de recuperação', async () => {
    await sut.execute('teste@teste.com');
    expect(usuarioService.findByEmail).toBeCalledWith('teste@teste.com');
    expect(recuperacaoService.randomString).toBeCalled();
    expect(emailService.send).toBeCalledWith(
      expect.objectContaining({
        to: expect.any(String),
        context: {
          hash: expect.any(String),
          nome: expect.any(String),
          url: expect.any(String),
        },
      } as EmailOptions),
    );
  });

  it('Deve dar erro de usuário não encontrado', async () => {
    jest.spyOn(usuarioService, 'findByEmail').mockResolvedValue(null);
    await expect(() => sut.execute('teste@teste.com')).rejects.toThrow(
      UsuarioNaoEncontradoError,
    );
  });

  it('Deve dar erro ao enviar e-mail', async () => {
    jest.spyOn(emailService, 'send').mockRejectedValue(new Error());
    await expect(() => sut.execute('teste@teste.com')).rejects.toThrow(
      EMailSendError,
    );
  });
});
