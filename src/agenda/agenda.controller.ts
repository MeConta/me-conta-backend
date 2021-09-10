import { Post, Patch, UseGuards } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { DefaultController } from '../default.controller';
import { Agenda } from './entities/agenda.entity';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TOKEN_NAME } from '../config/swagger.config';

@ApiTags('Agenda')
export class AgendaController extends DefaultController(
  'agenda',
  Agenda,
  AgendaService,
  CreateAgendaDto,
  UpdateAgendaDto,
) {
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth(TOKEN_NAME)
  @ApiBadRequestResponse({
    description: `Requisição inválida`,
  })
  @ApiUnprocessableEntityResponse({
    description: `Violação de regra de negócio`,
  })
  create(dto: CreateAgendaDto): Promise<Agenda> {
    return super.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth(TOKEN_NAME)
  @ApiNotFoundResponse({
    description: `Item não encontrado`,
  })
  @ApiBadRequestResponse({
    description: `Requisição inválida`,
  })
  @ApiUnprocessableEntityResponse({
    description: `Violação de regra de negócio`,
  })
  update(id: number, dto: UpdateAgendaDto): Promise<Agenda> {
    return super.update(id, dto);
  }
}
