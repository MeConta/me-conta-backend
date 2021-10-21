import { createMock } from '@golevelup/ts-jest';
import { UsuarioNaoEncontradoError } from '../../usuarios/erros/erros';
import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { EMailSendError, RecuperarSenha } from './recuperar-senha.feat';
import { ISalvarHashRecuperacaoService } from '../services/recuperacao.service';
import {
  EmailOptions,
  ISendEmailService,
} from '../../mail/services/mail.service';
import { IHashGenerateRandomString } from '../../usuarios/services/hash.service';
import { IBuscarUsuarioViaEmailService } from '../../usuarios/services/usuario.service';

describe('Recuperar senha', () => {
  let sut: RecuperarSenha;
  let usuarioService: IBuscarUsuarioViaEmailService;
  let emailService: ISendEmailService;
  let recuperacaoService: ISalvarHashRecuperacaoService &
    IHashGenerateRandomString;
  beforeEach(() => {
    usuarioService = createMock<IBuscarUsuarioViaEmailService>();
    recuperacaoService = createMock<
      ISalvarHashRecuperacaoService & IHashGenerateRandomString
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
        to: 'teste@teste.com',
        context: {
          hash: 'unique_hash',
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
