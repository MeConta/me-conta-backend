import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  ServiceUnavailableException,
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
import { EMailSendError } from '../../../../../_business/mail/services/mail.service';

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
  @HttpCode(HttpStatus.NO_CONTENT)
  async aprovar(
    @Param('id') id: number,
    @Body()
    { aprovado, link }: AutorizarVoluntarioInputDto,
  ): Promise<void> {
    try {
      await this.autorizarVoluntario.execute(id, { aprovado, link });
    } catch (e) {
      switch (true) {
        case e instanceof VoluntarioNaoEncontradoError:
          throw new NotFoundException(e);
        case e instanceof EMailSendError:
          throw new ServiceUnavailableException(e);
        default:
          throw new InternalServerErrorException({
            code: 500,
            message: 'Erro genérico',
          });
      }
    }
  }
}
