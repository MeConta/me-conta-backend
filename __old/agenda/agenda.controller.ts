import { AgendaService } from './agenda.service';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { DefaultController } from '../../src/default.controller';
import { Agenda } from './entities/agenda.entity';
import { ApiTags } from '@nestjs/swagger';
import { PostApi, Auth, PatchApi } from '../../src/decorators';

@ApiTags('Agenda')
@Auth()
export class AgendaController extends DefaultController(
  'agenda',
  Agenda,
  AgendaService,
  CreateAgendaDto,
  UpdateAgendaDto,
) {
  @PostApi()
  create(dto: CreateAgendaDto): Promise<Agenda> {
    return super.create(dto);
  }

  @PatchApi()
  update(id: number, dto: UpdateAgendaDto): Promise<Agenda> {
    return super.update(id, dto);
  }
}
