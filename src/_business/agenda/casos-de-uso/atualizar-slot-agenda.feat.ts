import { SlotAgenda } from '../entidades/slot-agenda.entity';
import {
  IAtualizaSlotAgendaService,
  IBuscarSlotAgendaByIdService,
} from '../services/agenda.service';

import {
  DateUnit,
  IDateAdd,
  IDateGreaterThan,
} from '../services/date-time.service';

export type AtualizarSlotInput = {
  id: number;
  slot: Pick<SlotAgenda, 'inicio'>;
};

export class SlotNaAgendaNaoEncontrado extends Error {
  code = 404;
  message = 'Slot não encontrado na agenda.';
}

export class SlotComMenosDe24HorasError extends Error {
  code = 400;
  message =
    'É necessário que haja um intervalo maior do que 24 horas para atualizar o slot.';
}

export class AtualizarSlotDeAgenda {
  constructor(
    private readonly agendaService: IAtualizaSlotAgendaService &
      IBuscarSlotAgendaByIdService,
    private readonly dateHelper: IDateAdd & IDateGreaterThan,
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
}
