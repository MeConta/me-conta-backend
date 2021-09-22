import { Module } from '@nestjs/common';
import { AgendaController } from './agenda.controller';
import { AgendaService } from './agenda.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlotAgendaDbEntity } from '../_adapters/agenda/entidades/slot-agenda.db-entity';

@Module({
  imports: [TypeOrmModule.forFeature([SlotAgendaDbEntity])],
  controllers: [AgendaController],
  providers: [AgendaService],
})
export class AgendaModule {}
