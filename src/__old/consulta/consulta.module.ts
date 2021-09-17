import { forwardRef, Module } from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { ConsultaController } from './consulta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consulta } from './entities/consulta.entity';
import { AgendaModule } from '../agenda/agenda.module';

@Module({
  imports: [
    forwardRef(() => AgendaModule),
    TypeOrmModule.forFeature([Consulta]),
  ],
  controllers: [ConsultaController],
  providers: [ConsultaService],
  exports: [ConsultaService],
})
export class ConsultaModule {}
