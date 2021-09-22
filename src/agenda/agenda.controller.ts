import { Body, Controller, Post } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { CriarSlotAgendaParams } from '../_business/atendente/agendamentos/interfaces/criar-slot-agenda.service';
import { IsDate, IsNotEmpty } from 'class-validator';

class CriarSlotAgendaDto implements CriarSlotAgendaParams {
  @IsDate()
  inicio: Date;
  @IsDate()
  fim: Date;
  @IsNotEmpty()
  idAtendente: string;
}

@Controller('agenda')
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) {}

  @Post()
  async create(@Body() dto: CriarSlotAgendaDto): Promise<void> {
    return this.agendaService.criarSlotNovo(dto);
  }
}
