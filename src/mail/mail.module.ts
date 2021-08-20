import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('EMAIL_SMTP_HOST'),
          port: config.get('EMAIL_SMTP_PORT'), // change to configured tls port for smtp server
          secure: true,
          auth: {
            type: 'login',
            user: config.get('EMAIL_SMTP_USERNAME'),
            pass: config.get('EMAIL_SMTP_PASSWORD'),
          },
        },
        defaults: {
          from: `"No Reply" <${config.get('EMAIL_FROM')}>`,
        },
        template: {
          dir: join(__dirname, '..', '..', 'mail', 'templates'),
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {
  constructor() {
    console.log('ENV', process.env);
    console.log('ENV', process.env.EMAIL_SMTP_HOST);
  }
}
