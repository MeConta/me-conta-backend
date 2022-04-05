import { SlotAgenda } from '../entidades/slot-agenda.entity';
import {
  IAtualizaSlotAgendaService,
  IBuscarSlotAgendaByIdService,
  RecuperaSlotsAgendaService,
} from '../services/agenda.service';

import {
  DateUnit,
  IDateAdd,
  IDateEndOf,
  IDateGreaterThan,
  IDateStartOf,
} from '../services/date-time.service';

export type AtualizarSlotInput = {
  id: number;
  slot: Pick<SlotAgenda, 'inicio'>;
};

export class SlotNaAgendaNaoEncontrado extends Error {
  code = 404;
  message = 'Slot não encontrado na agenda.';
}

export class SlotOcupadoError extends Error {
  code = '409';
  message = 'Já existe um slot cadastrado para esse horário.';
}

export class SlotComMenosDe24HorasError extends Error {
  code = 400;
  message =
    'É necessário que haja um intervalo maior do que 24 horas para atualizar o slot.';
}

export class AtualizarSlotDeAgenda {
  constructor(
    private readonly agendaService: IAtualizaSlotAgendaService &
      IBuscarSlotAgendaByIdService &
      RecuperaSlotsAgendaService,
    private readonly dateHelper: IDateAdd &
      IDateGreaterThan &
      IDateStartOf &
      IDateEndOf,
  ) {}

  async execute({ id, slot }: AtualizarSlotInput): Promise<SlotAgenda> {
    const slotEncontrado = await this.agendaService.findById(id);

    if (!slotEncontrado) {
      throw new SlotNaAgendaNaoEncontrado();
    }

    if (!this.verificarSeOSlotAtualTemAte24Horas(slotEncontrado.inicio)) {
      throw new SlotComMenosDe24HorasError();
    }

    const fim = this.dateHelper.add(slot.inicio, 1, DateUnit.HOURS);

    if (
      await this.verificarConflitoSlot(
        slot.inicio,
        fim,
        (
          await slotEncontrado.voluntario
        ).id,
      )
    ) {
      throw new SlotOcupadoError();
    }

    const slotAtualizado = await this.agendaService.atualiza(id, {
      ...slot,
      fim,
    });

    return slotAtualizado;
  }

  private verificarSeOSlotAtualTemAte24Horas(
    dataInicioAtualizada: Date,
  ): boolean {
    const dataDeHojeMais24horas = this.dateHelper.add(
      new Date(),
      24,
      DateUnit.HOURS,
    );

    return this.dateHelper.greaterThan(
      dataInicioAtualizada,
      dataDeHojeMais24horas,
    );
  }

  private async verificarConflitoSlot(
    horarioInicio: Date,
    horarioFim: Date,
    atendenteId: number,
  ): Promise<boolean> {
    const slotsNaAgenda = await this.agendaService.recuperaSlots({
      atendenteId,
      inicio: this.dateHelper.startOf(horarioInicio),
      fim: this.dateHelper.endOf(horarioFim),
    });

    return slotsNaAgenda.some(
      ({ inicio, fim }) => inicio < horarioFim && fim > horarioInicio,
    );
  }
}
