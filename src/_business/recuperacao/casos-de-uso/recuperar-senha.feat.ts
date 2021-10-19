import { IBuscarUsuarioViaEmail } from '../../usuarios/casos-de-uso/buscar-usuario-email.feat';
import { UsuarioNaoEncontradoError } from '../../usuarios/erros/erros';
import {
  ICriarHashRecuperacaoService,
  ISalvarHashRecuperacaoService,
} from '../services/recuperacao.service';
import {
  EmailOptions,
  ISendEmailService,
} from '../../mail/services/mail.service';

export class EMailSendError extends Error {
  code = 500;
  message = 'Erro ao enviar e-mail';
}

export class RecuperarSenha {
  constructor(
    private readonly usuarioService: IBuscarUsuarioViaEmail,
    private readonly recuperacaoService: ISalvarHashRecuperacaoService &
      ICriarHashRecuperacaoService,
    private readonly emailService: ISendEmailService,
    private readonly emailOptions: Pick<
      EmailOptions,
      'from' | 'subject' | 'template'
    >,
  ) {}

  async execute(input: string): Promise<void> {
    const usuario = await this.usuarioService.findByEmail(input);
    if (!usuario?.email) {
      throw new UsuarioNaoEncontradoError();
    }
    const hash = await this.recuperacaoService.criarHash();
    await this.recuperacaoService.salvar({
      usuario,
      hash,
    });
    try {
      await this.emailService.send({
        ...this.emailOptions,
        to: usuario.email,
        context: {
          hash,
        },
      });
    } catch (e) {
      throw new EMailSendError();
    }
  }
}
