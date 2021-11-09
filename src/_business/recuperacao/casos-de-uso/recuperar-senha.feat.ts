import { UsuarioNaoEncontradoError } from '../../usuarios/erros/usuarios.errors';
import { ISalvarHashRecuperacaoService } from '../services/recuperacao.service';
import {
  EmailOptions,
  ISendEmailService,
} from '../../mail/services/mail.service';
import { IHashGenerateRandomString } from '../../usuarios/services/hash.service';
import { IBuscarUsuarioViaEmailService } from '../../usuarios/services/usuario.service';
import { DateUnits, IDateAdd } from '../../agenda/interfaces/date-time.service';

export class EMailSendError extends Error {
  code = 500;
  message = 'Erro ao enviar e-mail';
}

export class RecuperarSenha {
  constructor(
    private readonly usuarioService: IBuscarUsuarioViaEmailService,
    private readonly recuperacaoService: ISalvarHashRecuperacaoService &
      IHashGenerateRandomString,
    private readonly dateService: IDateAdd,
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
      dataExpiracao: this.dateService.add(
        new Date(),
        +process.env.PASSWORD_RECOVERY_EXPIRATION_DAYS,
        DateUnits.DAYS,
      ),
    });
    try {
      await this.emailService.send({
        ...this.emailOptions,
        to: usuario.email,
        context: {
          hash,
          nome: usuario.nome,
          url: process.env.PASSWORD_RECOVERY_FRONT_URL,
        },
      });
    } catch (e) {
      throw new EMailSendError();
    }
  }
}
