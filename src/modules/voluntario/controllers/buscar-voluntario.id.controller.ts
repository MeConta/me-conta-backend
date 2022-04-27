import { ApiOkResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  Param,
  Get,
} from '@nestjs/common';
import { VoluntarioNaoEncontradoError } from '../../../_business/admin/casos-de-uso/autorizar-voluntario.feat';
import {
  Auth,
  AuthParam,
} from '../../../_adapters/auth/decorators/auth.decorator';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { BuscarVoluntariosDto } from '../../../_adapters/voluntarios/dto/buscar-voluntarios.dto';
import { BuscarVoluntarioViaId } from '../../../_business/voluntarios/casos-de-uso/buscar-voluntario.id.feat';

@ApiTags('Voluntário')
@Controller('voluntarios')
export class BuscarVoluntarioViaIdController {
  constructor(
    @Inject(BuscarVoluntarioViaId)
    private readonly useCase: BuscarVoluntarioViaId,
  ) {}
  @Get(':id')
  @Auth(TipoUsuario.ATENDENTE, TipoUsuario.ADMINISTRADOR)
  @AuthParam()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    isArray: true,
    description: 'Voluntário encontrado',
    type: BuscarVoluntariosDto,
  })
  @ApiNotFoundResponse({
    description: 'Voluntário não encontrado',
  })
  async buscar(@Param('id') id: number): Promise<BuscarVoluntariosDto> {
    try {
      return this.useCase.execute(id);
    } catch (e) {
      switch (true) {
        case e instanceof VoluntarioNaoEncontradoError:
          throw new VoluntarioNaoEncontradoError(e);
        default:
          throw new InternalServerErrorException({
            code: 500,
            message: 'Erro genérico',
          });
      }
    }
  }
}
