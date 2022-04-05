import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common';
import { Auth } from '../../../decorators';
import {
  ApiNotFoundResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { AtualizarSlotAgendaDto } from '../../../_adapters/agenda/dto/atualizar-slot-agenda.dto';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import {
  AtualizarSlotDeAgenda,
  SlotComMenosDe24HorasError,
  SlotNaAgendaNaoEncontrado,
  SlotOcupadoError,
} from '../../../_business/agenda/casos-de-uso/atualizar-slot-agenda.feat';
import { SlotAgenda } from '../../../_business/agenda/entidades/slot-agenda.entity';

@ApiTags('Agenda')
@Controller('agenda')
export class AtualizarSlotAgendaController {
  constructor(private readonly atualizarSlotDeAgenda: AtualizarSlotDeAgenda) {}

  @Put(':id')
  @ApiUnprocessableEntityResponse({
    description: 'Usuário não voluntário ou não aprovado',
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
  })
  @Auth(TipoUsuario.ATENDENTE)
  @HttpCode(HttpStatus.OK)
  async update(
    @Body() { slot }: AtualizarSlotAgendaDto,
    @Param('id') id: number,
  ): Promise<SlotAgenda> {
    try {
      return await this.atualizarSlotDeAgenda.execute({
        id,
        slot,
      });
    } catch (e) {
      switch (true) {
        case e instanceof SlotComMenosDe24HorasError:
          throw new BadRequestException(e);
        case e instanceof SlotOcupadoError:
          throw new ConflictException(e);
        case e instanceof SlotNaAgendaNaoEncontrado:
          throw new NotFoundException(e);
        default:
          throw new InternalServerErrorException({
            code: 500,
            message: 'Erro genérico',
          });
      }
    }
  }
}
