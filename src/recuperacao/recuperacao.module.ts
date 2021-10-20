import { Inject, Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecuperacaoDbEntity } from '../_adapters/recuperacao/entidades/recuperacao.db.entity';
import { RecuperarSenha } from '../_business/recuperacao/casos-de-uso/recuperar-senha.feat';
import { TypeormUsuarioService } from '../_adapters/usuarios/services/typeorm-usuario.service';
import { IBuscarUsuarioViaEmail } from '../_business/usuarios/casos-de-uso/buscar-usuario-email.feat';
import { TypeormRecuperacaoService } from '../_adapters/recuperacao/services/typeorm-recuperacao.service';
import { ISalvarHashRecuperacaoService } from '../_business/recuperacao/services/recuperacao.service';
import { ISendEmailService } from '../_business/mail/services/mail.service';
import { MailerMailService } from '../_adapters/mail/services/mailer-mail.service';
import { UsuarioDbEntity } from '../_adapters/usuarios/entidades/usuario.db.entity';
import { BcryptHashService } from '../_adapters/usuarios/services/bcrypt-hash.service';
import { RecuperacaoController } from './recuperacao.controller';
import { IHashGenerateRandomString } from '../_business/usuarios/services/hash.service';

@Injectable()
export class NestRecuperarSenha extends RecuperarSenha {
  constructor(
    @Inject(TypeormUsuarioService)
    usuarioService: IBuscarUsuarioViaEmail,
    @Inject(TypeormRecuperacaoService)
    recuperacaoService: ISalvarHashRecuperacaoService &
      IHashGenerateRandomString,
    @Inject(MailerMailService)
    emailService: ISendEmailService,
  ) {
    super(usuarioService, recuperacaoService, emailService, {
      subject: '[Me conta?] Recuperação de senha',
      template: './recuperacao',
    });
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioDbEntity, RecuperacaoDbEntity])],
  providers: [
    TypeormUsuarioService,
    TypeormRecuperacaoService,
    BcryptHashService,
    {
      provide: RecuperarSenha,
      useClass: NestRecuperarSenha,
    },
  ],
  controllers: [RecuperacaoController],
})
export class RecuperacaoModule {}
