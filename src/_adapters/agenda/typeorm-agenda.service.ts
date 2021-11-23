import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { SlotAgendaDbEntity } from './entidades/slot-agenda-db.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import {
  CriarSlotAgendaService,
  RecuperaSlotsAgendaService,
  SlotAgendaParam,
} from '../../_business/agenda/services/agenda.service';
import { SlotAgenda } from '../../_business/agenda/entidades/slot-agenda.entity';
import { Voluntario } from '../../_business/voluntarios/entidades/voluntario.entity';

import { DateUtils } from 'typeorm/util/DateUtils';

@Injectable()
export class TypeOrmAgendaService
  implements CriarSlotAgendaService, RecuperaSlotsAgendaService
{
  constructor(
    @InjectRepository(SlotAgendaDbEntity)
    private readonly agendaRepo: Repository<SlotAgendaDbEntity>,
  ) {}
  async cadastrar(param: SlotAgendaParam): Promise<void> {
    const entity = this.agendaRepo.create({
      voluntario: {
        usuario: {
          id: param.atendenteId,
        },
      } as Voluntario,
      inicio: param.inicio,
      fim: param.fim,
    });
    await this.agendaRepo.save(entity);
  }

  async recuperaSlots({
    inicio,
    fim,
    atendenteId,
  }: SlotAgendaParam): Promise<SlotAgenda[]> {
    return this.agendaRepo.find({
      where: {
        voluntario: atendenteId,
        inicio: MoreThanOrEqual(DateUtils.mixedDateToUtcDatetimeString(inicio)),
        fim: LessThanOrEqual(DateUtils.mixedDateToUtcDatetimeString(fim)),
      },
    });
  }
}
