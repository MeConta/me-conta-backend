import { TypeOrmAgendaService } from '../_adapters/agenda/typeorm-agenda.service';
import { SlotAgendaDbEntity } from '../_adapters/agenda/entidades/slot-agenda.db-entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class AgendaService extends TypeOrmAgendaService {
  constructor(
    @InjectRepository(SlotAgendaDbEntity)
    private readonly agendaRepository: Repository<SlotAgendaDbEntity>,
  ) {
    super(agendaRepository);
  }
}
