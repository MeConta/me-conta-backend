import { CriarSlotAgendaService } from '../../_business/agendamentos/criar-slot-agenda.service';
import { RecuperaSlotsAgendaService } from '../../_business/agendamentos/recupera-slots-agenda.service';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { SlotAgenda } from '../../_business/agendamentos/slot-agenda';
import { SlotAgendaDbEntity } from './slot-agenda-db.entity';

export class TypeOrmAgendaService
  implements CriarSlotAgendaService, RecuperaSlotsAgendaService
{
  constructor(private readonly agendaRepo: Repository<SlotAgendaDbEntity>) {}

  async criarSlotNovo(param: {
    inicio: Date;
    fim: Date;
    idAtendente: string;
  }): Promise<void> {
    const entity = this.agendaRepo.create({
      idAtendente: param.idAtendente,
      inicio: param.inicio.getTime(),
      fim: param.fim.getTime(),
    });
    await this.agendaRepo.save(entity);
  }

  async recuperaSlots(param: {
    inicio: Date;
    fim: Date;
    idAtendente: string;
  }): Promise<SlotAgenda[]> {
    const slotAgendaDbEntities = await this.agendaRepo.find({
      inicio: MoreThanOrEqual(param.inicio.getTime()),
      fim: LessThanOrEqual(param.fim.getTime()),
      idAtendente: param.idAtendente,
    });
    return slotAgendaDbEntities.map((dbEntity) => ({
      id: dbEntity.id,
      idAtendente: dbEntity.idAtendente,
      inicio: new Date(dbEntity.inicio),
      fim: new Date(dbEntity.fim),
    }));
  }
}
