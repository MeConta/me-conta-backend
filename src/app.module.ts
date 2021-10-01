import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import database from './config/database.config';
import { AppController } from './app.controller';
import { CadastroInicialModule } from './cadastro-inicial/cadastro-inicial.module';

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
    CadastroInicialModule,
    // AuthModule.forRoot(),
    // AgendaModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
