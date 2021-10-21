import { Inject, Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecuperacaoDbEntity } from '../_adapters/recuperacao/entidades/recuperacao.db.entity';
import { RecuperarSenha } from '../_business/recuperacao/casos-de-uso/recuperar-senha.feat';
import { TypeormUsuarioService } from '../_adapters/usuarios/services/typeorm-usuario.service';
import { TypeormRecuperacaoService } from '../_adapters/recuperacao/services/typeorm-recuperacao.service';
import {
  IBuscarRecuperacaoService,
  IRemoverRecuperacaoService,
  ISalvarHashRecuperacaoService,
} from '../_business/recuperacao/services/recuperacao.service';
import { ISendEmailService } from '../_business/mail/services/mail.service';
import { MailerMailService } from '../_adapters/mail/services/mailer-mail.service';
import { UsuarioDbEntity } from '../_adapters/usuarios/entidades/usuario.db.entity';
import { BcryptHashService } from '../_adapters/usuarios/services/bcrypt-hash.service';
import { RecuperacaoController } from './recuperacao.controller';
import {
  IHashGenerateRandomString,
  IHashHashService,
} from '../_business/usuarios/services/hash.service';
import {
  IAtualizarUsuarioService,
  IBuscarUsuarioViaEmailService,
} from '../_business/usuarios/services/usuario.service';
import { ResetController } from './reset.controller';
import { ResetSenha } from '../_business/recuperacao/casos-de-uso/reset-senha.feat';

@Injectable()
export class NestRecuperarSenha extends RecuperarSenha {
  constructor(
    @Inject(TypeormUsuarioService)
    usuarioService: IBuscarUsuarioViaEmailService,
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

@Injectable()
export class NestResetSenha extends ResetSenha {
  constructor(
    @Inject(TypeormRecuperacaoService)
    recuperacaoService: IBuscarRecuperacaoService & IRemoverRecuperacaoService,
    @Inject(TypeormUsuarioService)
    usuarioService: IAtualizarUsuarioService,
    @Inject(BcryptHashService)
    hashService: IHashHashService,
  ) {
    super(recuperacaoService, usuarioService, hashService);
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
    {
      provide: ResetSenha,
      useClass: NestResetSenha,
    },
  ],
  controllers: [RecuperacaoController, ResetController],
})
export class RecuperacaoModule {}
