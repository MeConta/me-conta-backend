import {
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { ListarSlotsAgenda } from '../../../_business/agenda/casos-de-uso/listar-slots.agenda.feat';
import { IdParam } from '../../../_adapters/agenda/dto/id.param.dto';
import { VoluntarioNaoEncontradoError } from '../../../_business/admin/casos-de-uso/autorizar-voluntario.feat';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Agenda')
@Controller('agenda')
export class ListarSlotsAgendaController {
  constructor(
    @Inject(ListarSlotsAgenda)
    private readonly listarSlotsAgenda: ListarSlotsAgenda,
  ) {}

  @ApiInternalServerErrorResponse({
    description: 'Erro genérico',
  })
  @ApiNotFoundResponse({
    description: 'Voluntário não encontrado',
  })
  @Get(':id?')
  async get(@Param() param?: IdParam) {
    try {
      return await this.listarSlotsAgenda.execute(param?.id);
    } catch (e) {
      if (e instanceof VoluntarioNaoEncontradoError) {
        throw new NotFoundException(e);
      }
      throw new InternalServerErrorException({
        code: 500,
        message: 'Erro genérico',
      });
    }
  }
}
