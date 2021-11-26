import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import {
  RemoverSlotAgenda,
  SlotAgendaNaoEncontradoError,
} from '../../../_business/agenda/casos-de-uso/remover-slot-agenda.feat';
import { Auth } from '../../../_adapters/auth/decorators/auth.decorator';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { VoluntarioNaoEncontradoError } from '../../../_business/admin/casos-de-uso/autorizar-voluntario.feat';
import { IdParam } from '../../../_adapters/agenda/dto/id.param.dto';

@Controller('agenda')
export class RemoverSlotAgendaController {
  constructor(private readonly removerSlotAgenda: RemoverSlotAgenda) {}

  @Delete(':id')
  @Auth(TipoUsuario.ATENDENTE)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remover(@Param() { id }: IdParam): Promise<void> {
    try {
      await this.removerSlotAgenda.execute(id);
    } catch (e) {
      switch (true) {
        case e instanceof SlotAgendaNaoEncontradoError:
        case e instanceof VoluntarioNaoEncontradoError:
          throw new NotFoundException(e);
        default:
          throw new InternalServerErrorException(e);
      }
    }
  }
}
