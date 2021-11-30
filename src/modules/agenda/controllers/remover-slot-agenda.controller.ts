import {
  Controller,
  Delete,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  RemoverSlotAgenda,
  SlotAgendaNaoEncontradoError,
  SlotNaoPertenceAoVoluntarioError,
  SlotNoPassadoError,
} from '../../../_business/agenda/casos-de-uso/remover-slot-agenda.feat';
import { Auth } from '../../../_adapters/auth/decorators/auth.decorator';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { VoluntarioNaoEncontradoError } from '../../../_business/admin/casos-de-uso/autorizar-voluntario.feat';
import { IdParam } from '../../../_adapters/agenda/dto/id.param.dto';
import { User } from '../../../_adapters/auth/decorators/user.decorator';
import { ITokenUser } from '../../../_business/auth/interfaces/auth';

@Controller('agenda')
export class RemoverSlotAgendaController {
  constructor(private readonly removerSlotAgenda: RemoverSlotAgenda) {}

  @Delete(':id')
  @Auth(TipoUsuario.ATENDENTE)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remover(
    @Param() { id }: IdParam,
    @User() user: Pick<ITokenUser, 'id'>,
  ): Promise<void> {
    try {
      await this.removerSlotAgenda.execute(id, user.id);
    } catch (e) {
      switch (true) {
        case e instanceof SlotAgendaNaoEncontradoError:
        case e instanceof VoluntarioNaoEncontradoError:
          throw new NotFoundException(e);
        case e instanceof SlotNaoPertenceAoVoluntarioError:
          throw new ForbiddenException(e);
        case e instanceof SlotNoPassadoError:
          throw new UnprocessableEntityException(e);
        default:
          throw new InternalServerErrorException({
            code: 500,
            message: 'Erro genérico',
          });
      }
    }
  }
}
