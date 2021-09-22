import { Body, Controller, NotAcceptableException, Post } from '@nestjs/common';
import { CriarNovoSlotDeAgenda } from '../_business/atendente/agendamentos/casos-de-uso/criar-novo-slot-de-agenda.feat';
import { User } from '../decorators/user.decorator';

export function isValidDate(value: any): value is Date {
  return value instanceof Date && !isNaN(value as any);
}

class CriarSlotAgendaDto {
  inicio: string;
}

@Controller('agenda')
export class AgendaController {
  constructor(private readonly criarNovoSlotDeAgenda: CriarNovoSlotDeAgenda) {}

  @Post()
  async create(
    @Body() dto: CriarSlotAgendaDto,
    @User() user: { id: number },
  ): Promise<void> {
    const inicioData = new Date(dto.inicio);
    if (!isValidDate(inicioData)) {
      throw new NotAcceptableException('Data inválida');
    }
    return this.criarNovoSlotDeAgenda.execute({
      idUsuario: user.id,
      inicio: inicioData,
    });
  }
}
