import {
  FindConditions,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { SlotAgendaDbEntity } from '../entidades/slot-agenda-db.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import {
  CriarSlotAgendaService,
  IBuscarSlotAgendaByIdService,
  IRemoverSlotAgendaService,
  RecuperaSlotsAgendaService,
  SlotAgendaParam,
  IAtualizaSlotAgendaService,
} from '../../../_business/agenda/services/agenda.service';
import { SlotAgenda } from '../../../_business/agenda/entidades/slot-agenda.entity';

@Injectable()
export class TypeOrmAgendaService
  implements
    CriarSlotAgendaService,
    RecuperaSlotsAgendaService,
    IBuscarSlotAgendaByIdService,
    IRemoverSlotAgendaService,
    IAtualizaSlotAgendaService
{
  constructor(
    @InjectRepository(SlotAgendaDbEntity)
    private readonly agendaRepo: Repository<SlotAgendaDbEntity>,
  ) {}
  async cadastrar(param: SlotAgendaParam): Promise<void> {
    const entity = this.agendaRepo.create({
      voluntarioId: param.voluntarioId,
      inicio: param.inicio,
      fim: param.fim,
    });
    await this.agendaRepo.save(entity);
  }

  async recuperaSlots({
    inicio,
    fim,
    voluntarioId,
  }: Partial<SlotAgendaParam> = {}): Promise<SlotAgenda[]> {
    const where: FindConditions<SlotAgenda> = {};
    if (voluntarioId) {
      where.voluntario = await Promise.resolve({
        usuario: {
          id: voluntarioId,
        },
      });
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

  findById(id: number): Promise<SlotAgenda> {
    return this.agendaRepo.findOne(id);
  }

  async removerSlot(id: number): Promise<void> {
    await this.agendaRepo.softDelete({ id });
  }

  async atualiza(
    id: number,
    input: Omit<SlotAgendaParam, 'atendenteId'>,
  ): Promise<SlotAgenda> {
    await this.agendaRepo.update(id, input);

    const slotUpdated = await this.agendaRepo.findOne({ id });

    return slotUpdated;
  }
}
