import { Global, Module } from '@nestjs/common';
import { MailerMailService } from '../../src/_adapters/mail/services/mailer-mail.service';
import { createMock } from '@golevelup/ts-jest';

@Global()
@Module({
  providers: [
    {
      provide: MailerMailService,
      useValue: createMock<MailerMailService>(),
    },
  ],
  exports: [MailerMailService],
})
export class MailE2EModule {}
