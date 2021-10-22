import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import database from './config/database.config';
import { AppController } from './app.controller';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { AuthModule } from './modules/auth/auth.module';
import { VoluntarioModule } from './modules/voluntario/voluntario.module';
import { PerfilModule } from './modules/perfil/perfil.module';
import { AlunoModule } from './modules/aluno/aluno.module';
import { RecuperacaoModule } from './modules/recuperacao/recuperacao.module';
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
    UsuarioModule,
    VoluntarioModule,
    AlunoModule,
    RecuperacaoModule,
    // AgendaModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
