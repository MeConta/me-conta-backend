import { forwardRef, Module } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { AgendaController } from './agenda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agenda } from './entities/agenda.entity';
import { ConsultaModule } from '../consulta/consulta.module';

@Module({
  imports: [
    forwardRef(() => ConsultaModule),
    TypeOrmModule.forFeature([Agenda]),
  ],
  controllers: [AgendaController],
  providers: [AgendaService],
  exports: [AgendaService],
})
export class AgendaModule {}
