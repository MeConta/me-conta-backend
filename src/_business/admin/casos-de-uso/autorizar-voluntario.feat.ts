import {
  IAtualizarAprovacaoVoluntario,
  IBuscarVoluntarioViaId,
} from '../../voluntarios/services/voluntario.service';
import { Voluntario } from '../../voluntarios/entidades/voluntario.entity';
import {
  EmailOptions,
  EMailSendError,
  ISendEmailService,
} from '../../mail/services/mail.service';

export type AutorizarVoluntarioInput = Pick<Voluntario, 'aprovado'>;

export class VoluntarioNaoEncontradoError extends Error {
  code = 404;
  message = 'Voluntário não encontrado';
}

export class AutorizarVoluntario {
  constructor(
    private readonly service: IBuscarVoluntarioViaId &
      IAtualizarAprovacaoVoluntario,
    private readonly emailService: ISendEmailService,
    private readonly emailOptions: Pick<EmailOptions, 'subject'>,
  ) {}

  async execute(id: number, status: boolean): Promise<void> {
    const voluntario = await this.service.findById(id);
    if (!voluntario) {
      throw new VoluntarioNaoEncontradoError();
    }
    await this.service.atualizarAprovacao(id, status);
    try {
      const template = status
        ? './voluntario-aprovacao'
        : './voluntario-reprovacao';
      const { usuario } = voluntario;
      await this.emailService.send({
        ...this.emailOptions,
        template,
        to: usuario.email,
        context: {
          nome: usuario.nome,
          url: process.env.FRONT_URL,
        },
      });
    } catch (e) {
      throw new EMailSendError();
    }
  }
}
