import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { AuthModule } from './modules/auth/auth.module';
import { VoluntarioModule } from './modules/voluntario/voluntario.module';
import { PerfilModule } from './modules/perfil/perfil.module';
import { AlunoModule } from './modules/aluno/aluno.module';
import { RecuperacaoModule } from './modules/recuperacao/recuperacao.module';
import { MailModule } from './mail/mail.module';
import { AdminModule } from './modules/admin/admin.module';
import { ConfigService } from './config/config.service';
import { AgendaModule } from './modules/agenda/agenda.module';
import { AtendimentoModule } from './modules/atendimento/atendimento.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env.production', '.env'],
      expandVariables: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    TypeOrmModule.forRoot(new ConfigService(process.env).typeOrmOptions),
    AuthModule.forRoot(),
    MailModule,
    PerfilModule,
    UsuarioModule,
    VoluntarioModule,
    AlunoModule,
    RecuperacaoModule,
    AdminModule,
    AgendaModule,
    AtendimentoModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
