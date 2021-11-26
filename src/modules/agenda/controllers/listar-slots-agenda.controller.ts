import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { ListarSlotsAgenda } from '../../../_business/agenda/casos-de-uso/listar-slots.agenda.feat';
import { IdParam } from '../../../_adapters/agenda/dto/id.param.dto';
import { VoluntarioNaoEncontradoError } from '../../../_business/admin/casos-de-uso/autorizar-voluntario.feat';

@Controller('agenda')
export class ListarSlotsAgendaController {
  constructor(
    @Inject(ListarSlotsAgenda)
    private readonly listarSlotsAgenda: ListarSlotsAgenda,
  ) {}

  @Get(':id?')
  async get(@Param() param?: IdParam) {
    try {
      return await this.listarSlotsAgenda.execute(param?.id);
    } catch (e) {
      if (e instanceof VoluntarioNaoEncontradoError) {
        throw new NotFoundException(e);
      }
    }
  }
}
