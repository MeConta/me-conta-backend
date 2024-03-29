import {
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { ListarSlotsVoluntario } from '../../../_business/voluntarios/casos-de-uso/listar-slots-voluntario.feat';
import { IdParam } from '../../../_adapters/agenda/dto/id.param.dto';
import { VoluntarioNaoEncontradoError } from '../../../_business/admin/casos-de-uso/autorizar-voluntario.feat';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ListSlotAgendaDto } from '../../..//_adapters/agenda/dto/list-slot-agenda.dto';

@ApiTags('Voluntário')
@Controller('voluntario')
export class ListarSlotsVoluntarioController {
  constructor(
    @Inject(ListarSlotsVoluntario)
    private readonly listarSlotsVoluntario: ListarSlotsVoluntario,
  ) {}

  @ApiInternalServerErrorResponse({
    description: 'Erro genérico',
  })
  @ApiNotFoundResponse({
    description: 'Voluntário não encontrado',
  })
  @Get(':id?/horarios-disponiveis')
  async get(@Param() param?: IdParam, @Query() query?: ListSlotAgendaDto) {
    try {
      return await this.listarSlotsVoluntario.execute(param?.id, query?.inicio);
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
