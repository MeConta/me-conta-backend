import {
  FindConditions,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
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
  }: Partial<SlotAgendaParam> = {}): Promise<SlotAgenda[]> {
    const where: FindConditions<SlotAgenda> = {};
    if (atendenteId) {
      where.voluntario = {
        usuario: {
          id: atendenteId,
        },
      };
    }

    if (inicio) {
      where.inicio = MoreThanOrEqual(inicio);
    }
    if (fim) {
      where.fim = LessThanOrEqual(fim);
    }
    return this.agendaRepo.find({
      where,
    });
  }
}
