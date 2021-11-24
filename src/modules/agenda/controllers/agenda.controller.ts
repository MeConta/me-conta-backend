import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  CriarNovoSlotDeAgenda,
  UsuarioNaoAtendenteError,
  VoluntarioNaoAprovadoError,
} from '../../../_business/agenda/casos-de-uso/criar-novo-slot-de-agenda.feat';
import { User } from '../../../_adapters/auth/decorators/user.decorator';
import { Auth, AuthParam } from '../../../decorators';
import { ApiTags } from '@nestjs/swagger';
import { ITokenUser } from '../../../_business/auth/interfaces/auth';
import { CreateSlotAgendaDto } from '../../../_adapters/agenda/dto/create-slot-agenda.dto';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';

@ApiTags('agenda')
@Controller('agenda')
export class AgendaController {
  constructor(private readonly criarNovoSlotDeAgenda: CriarNovoSlotDeAgenda) {}

  @Post()
  @Auth(TipoUsuario.ATENDENTE)
  @AuthParam()
  @HttpCode(HttpStatus.NO_CONTENT)
  async create(
    @Body() { slots }: CreateSlotAgendaDto,
    @User() { id }: Pick<ITokenUser, 'id'>,
  ): Promise<void> {
    try {
      return await this.criarNovoSlotDeAgenda.execute({
        voluntarioId: id,
        slots: slots,
      });
    } catch (e) {
      switch (true) {
        case e instanceof UsuarioNaoAtendenteError:
        case e instanceof VoluntarioNaoAprovadoError:
          throw new UnprocessableEntityException(e);
        default:
          throw new InternalServerErrorException(e);
      }
    }
  }
}
