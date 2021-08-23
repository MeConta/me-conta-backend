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
  public async sendEmail(email: Emails, context?: any): Promise<void> {
    const { to, from, subject, template } = getEmailInfo(email);
    try {
      await this.mailerService.sendMail({
        to,
        from,
        subject,
        template,
        context,
      });
    } catch (e) {
      throw new InternalServerErrorException(Erros.ERRO_AO_ENVIAR_EMAIL);
    }
  }
}
