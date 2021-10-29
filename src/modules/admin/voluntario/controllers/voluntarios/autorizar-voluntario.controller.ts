import {
  Body,
  Controller,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import {
  AutorizarVoluntario,
  VoluntarioNaoEncontradoError,
} from '../../../../../_business/admin/casos-de-uso/autorizar-voluntario.feat';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from '../../../../../_adapters/auth/decorators/auth.decorator';
import { TipoUsuario } from '../../../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { AutorizarVoluntarioInputDto } from '../../dto/autorizar-voluntario.dto';

@ApiTags('Admin')
@Controller('admin/voluntarios/aprovar')
export class AutorizarVoluntarioController {
  constructor(
    @Inject(AutorizarVoluntario)
    private readonly autorizarVoluntario: AutorizarVoluntario,
  ) {}

  @ApiNotFoundResponse({
    description: 'Voluntário não encontrado',
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro genérico',
  })
  @Patch(':id')
  @Auth(TipoUsuario.ADMINISTRADOR)
  async aprovar(
    @Param('id') id: number,
    @Body()
    dto: AutorizarVoluntarioInputDto,
  ): Promise<void> {
    try {
      await this.autorizarVoluntario.execute(id, dto.aprovado);
    } catch (e) {
      switch (true) {
        case e instanceof VoluntarioNaoEncontradoError:
          throw new NotFoundException(e);
        default:
          throw new InternalServerErrorException(e);
      }
    }
  }
}
