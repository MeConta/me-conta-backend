import { Post, Patch } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { DefaultController } from '../default.controller';
import { Agenda } from './entities/agenda.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Agenda')
export class AgendaController extends DefaultController(
  'agenda',
  Agenda,
  AgendaService,
  CreateAgendaDto,
  UpdateAgendaDto,
) {
  @Post()
  @ApiCreatedResponse({
    description: `Item criado com sucesso`,
  })
  @ApiBadRequestResponse({
    description: `Requisição inválida`,
  })
  create(dto: CreateAgendaDto): Promise<Agenda> {
    return super.create(dto);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: `Item Atualizado com sucesso`,
  })
  @ApiNotFoundResponse({
    description: `Item não encontrado`,
  })
  @ApiBadRequestResponse({
    description: `Requisição inválida`,
  })
  update(id: number, dto: UpdateAgendaDto): Promise<Agenda> {
    return super.update(id, dto);
  }
}
