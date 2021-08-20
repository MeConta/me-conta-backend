import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { IContact } from './templates/contact.interface';
import { Erros, Emails, getEmailInfo } from '../config/constants';

@Injectable()
export class MailService {
  constructor(
    @Inject(MailerService)
    private readonly mailerService: MailerService,
  ) {}
  private async sendEmail(email: Emails, context?: any) {
    const { to, from, subject, template } = getEmailInfo(email);
    /* await this.mailerService.sendMail({
      to: to,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'E-mail de contato Me Conta?',
      template: './contact', // `.hbs` extension is appended automatically
      context: {
        nome: context.nome,
        email: context.email,
        mensagem: context.mensagem,
      } as IContact,
    }); */
    return this.mailerService.sendMail({
      to,
      from,
      subject,
      template,
      context,
    });
  }
  async sendContact(info: IContact) {
    try {
      await this.sendEmail(Emails.CONTATO, {
        nome: info.nome,
        email: info.email,
        mensagem: info.mensagem,
      } as IContact);
    } catch (e) {
      throw new InternalServerErrorException(Erros.ERRO_AO_ENVIAR_EMAIL);
    }
  }
}
