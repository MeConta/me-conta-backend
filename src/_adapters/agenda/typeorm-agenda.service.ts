import {
  CriarSlotAgendaParams,
  CriarSlotAgendaService,
} from '../../_business/atendente/agendamentos/interfaces/criar-slot-agenda.service';
import { RecuperaSlotsAgendaService } from '../../_business/atendente/agendamentos/interfaces/recupera-slots-agenda.service';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { SlotAgenda } from '../../_business/atendente/agendamentos/entidades/slot-agenda';
import { SlotAgendaDbEntity } from './entidades/slot-agenda.db-entity';

export class TypeOrmAgendaService
  implements CriarSlotAgendaService, RecuperaSlotsAgendaService
{
  constructor(private readonly agendaRepo: Repository<SlotAgendaDbEntity>) {}

  async criarSlotNovo(param: CriarSlotAgendaParams): Promise<void> {
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
