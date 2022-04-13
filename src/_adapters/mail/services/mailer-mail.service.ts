import { Inject, Injectable } from '@nestjs/common';
import {
  EmailOptions,
  ISendEmailService,
} from '../../../_business/mail/services/mail.service';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerMailService implements ISendEmailService {
  constructor(
    @Inject(MailerService)
    private readonly mailerService: MailerService,
  ) {}

  async send(options: EmailOptions): Promise<void> {
    return await this.mailerService.sendMail(options as ISendMailOptions);
  }
}
