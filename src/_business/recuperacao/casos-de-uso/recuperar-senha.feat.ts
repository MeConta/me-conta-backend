import { UsuarioNaoEncontradoError } from '../../usuarios/erros/erros';
import { ISalvarHashRecuperacaoService } from '../services/recuperacao.service';
import {
  EmailOptions,
  ISendEmailService,
} from '../../mail/services/mail.service';
import { IHashGenerateRandomString } from '../../usuarios/services/hash.service';
import { IBuscarUsuarioViaEmailService } from '../../usuarios/services/usuario.service';

export class EMailSendError extends Error {
  code = 500;
  message = 'Erro ao enviar e-mail';
}

export class RecuperarSenha {
  constructor(
    private readonly usuarioService: IBuscarUsuarioViaEmailService,
    private readonly recuperacaoService: ISalvarHashRecuperacaoService &
      IHashGenerateRandomString,
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
    const hash = this.recuperacaoService.randomString();
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
