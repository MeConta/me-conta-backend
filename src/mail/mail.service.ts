import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { IContact } from './templates/contact.interface';
import { Erros } from '../erros.enum';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendContact(info: IContact, to: string) {
    try {
      await this.mailerService.sendMail({
        to: to,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: 'E-mail de contato Me Conta?',
        template: './contact', // `.hbs` extension is appended automatically
        context: {
          nome: info.nome,
          email: info.email,
          mensagem: info.mensagem,
        } as IContact,
      });
    } catch (e) {
      throw new InternalServerErrorException(Erros.ERRO_AO_ENVIAR_EMAIL);
    }
  }
}
