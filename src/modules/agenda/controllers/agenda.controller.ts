import { Body, Controller, NotAcceptableException, Post } from '@nestjs/common';
import { CriarNovoSlotDeAgenda } from '../../../_business/agenda/casos-de-uso/criar-novo-slot-de-agenda.feat';
import { User } from '../../../_adapters/auth/decorators/user.decorator';
import { Auth } from '../../../decorators';
import { ApiTags } from '@nestjs/swagger';

export function isValidDate(value: any): value is Date {
  return value instanceof Date && !isNaN(value as any);
}

class CriarSlotAgendaDto {
  inicio: string;
}

@ApiTags('agenda')
@Controller('agenda')
export class AgendaController {
  constructor(private readonly criarNovoSlotDeAgenda: CriarNovoSlotDeAgenda) {}

  @Post()
  @Auth()
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
