import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CriarNovoSlotDeAgenda } from '../../../_business/agenda/casos-de-uso/criar-novo-slot-de-agenda.feat';
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
    // TODO: Tratamentos de erro
    return this.criarNovoSlotDeAgenda.execute({
      voluntarioId: id,
      slots: slots,
    });
  }
}
