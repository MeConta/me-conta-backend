import { Injectable } from '@nestjs/common';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { DefaultService } from '../default.service';
import { Agenda } from './entities/agenda.entity';

@Injectable()
export class AgendaService extends DefaultService(
  Agenda,
  CreateAgendaDto,
  UpdateAgendaDto,
) {}
