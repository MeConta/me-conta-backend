import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import database from './config/database.config';
import { AppController } from './app.controller';
import { CadastroInicialModule } from './cadastro-inicial/cadastro-inicial.module';
import { AuthModule } from './auth/auth.module';
import { CadastroVoluntarioModule } from './cadastro-voluntario/cadastro-voluntario.module';
import { PerfilModule } from './perfil/perfil.module';
import { AlunoModule } from './aluno/aluno.module';
import { RecuperacaoModule } from './recuperacao/recuperacao.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [database],
      envFilePath: ['.env.local', '.env.production', '.env'],
      expandVariables: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
    }),
    AuthModule.forRoot(),
    MailModule,
    PerfilModule,
    CadastroInicialModule,
    CadastroVoluntarioModule,
    AlunoModule,
    RecuperacaoModule,
    // AgendaModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
