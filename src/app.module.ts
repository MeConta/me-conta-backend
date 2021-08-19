import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsuarioModule } from './usuario/usuario.module';
import { AlunoModule } from './aluno/aluno.module';
import { AtendenteModule } from './atendente/atendente.module';
import { SupervisorModule } from './supervisor/supervisor.module';
import { FrenteAtuacaoModule } from './frente-atuacao/frente-atuacao.module';
import { AgendaModule } from './agenda/agenda.module';
import { ConsultaModule } from './consulta/consulta.module';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import database from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [database],
      expandVariables: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
    }),
    UsuarioModule,
    AlunoModule,
    AtendenteModule,
    SupervisorModule,
    FrenteAtuacaoModule,
    AgendaModule,
    ConsultaModule,
    AvaliacaoModule,
    AppModule,
  ],
})
export class AppModule {}
