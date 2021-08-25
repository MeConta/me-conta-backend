import { Post, Patch } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { DefaultController } from '../default.controller';
import { Agenda } from './entities/agenda.entity';

export class AgendaController extends DefaultController(
  'agenda',
  Agenda,
  AgendaService,
  CreateAgendaDto,
  UpdateAgendaDto,
) {
  @Post()
  create(dto: CreateAgendaDto): Promise<Agenda> {
    return super.create(dto);
  }

  @Patch()
  update(id: string, dto: UpdateAgendaDto): Promise<Agenda> {
    return super.update(id, dto);
  }
}
