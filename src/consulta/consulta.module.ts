import { Module } from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { ConsultaController } from './consulta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consulta } from './entities/consulta.entity';
import { AlunoModule } from '../aluno/aluno.module';
import { AgendaModule } from '../agenda/agenda.module';
import { AtendenteModule } from '../atendente/atendente.module';

@Module({
  imports: [
    AlunoModule,
    AgendaModule,
    AtendenteModule,
    TypeOrmModule.forFeature([Consulta]),
  ],
  controllers: [ConsultaController],
  providers: [ConsultaService],
})
export class ConsultaModule {}
