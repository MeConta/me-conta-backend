import { Inject, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoluntarioDbEntity } from '../../../_adapters/voluntarios/entidades/voluntario-db.entity';
import { TypeormVoluntarioService } from '../../../_adapters/voluntarios/services/typeorm-voluntario.service';
import { AutorizarVoluntario } from '../../../_business/admin/casos-de-uso/autorizar-voluntario.feat';
import {
  IAtualizarAprovacaoVoluntario,
  IBuscarVoluntarioViaId,
} from '../../../_business/voluntarios/services/voluntario.service';
import { AutorizarVoluntarioController } from './controllers/voluntarios/autorizar-voluntario.controller';
import { MailerMailService } from '../../../_adapters/mail/services/mailer-mail.service';
import { ISendEmailService } from '../../../_business/mail/services/mail.service';

class NestAutorizarVoluntario extends AutorizarVoluntario {
  constructor(
    @Inject(TypeormVoluntarioService)
    voluntarioService: IBuscarVoluntarioViaId & IAtualizarAprovacaoVoluntario,
    @Inject(MailerMailService)
    emailService: ISendEmailService,
  ) {
    super(voluntarioService, emailService, {
      subject: '[Me conta?] Alteração do status da sua conta de voluntário',
    });
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([VoluntarioDbEntity])],
  providers: [
    TypeormVoluntarioService,
    {
      provide: AutorizarVoluntario,
      useClass: NestAutorizarVoluntario,
    },
  ],
  controllers: [AutorizarVoluntarioController],
  exports: [AutorizarVoluntario],
})
export class AdminVoluntarioModule {}
