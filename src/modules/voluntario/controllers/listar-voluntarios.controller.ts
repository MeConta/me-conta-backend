import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ListarVoluntarios } from '../../../_business/voluntarios/casos-de-uso/listar-voluntarios.feat';
import { User } from '../../../_adapters/auth/decorators/user.decorator';
import { OptionalAuth } from '../../../_adapters/auth/decorators/auth.decorator';
import { ITokenUser } from '../../../_business/auth/interfaces/auth';
import { TipoUsuarioParam } from '../../../_adapters/voluntarios/dto/tipo-voluntario.param.dto';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ListaVoluntariosDto } from '../../../_adapters/voluntarios/dto/lista-voluntarios.dto';

@ApiTags('Voluntário')
@Controller('voluntarios/listar')
export class ListarVoluntariosController {
  constructor(
    @Inject(ListarVoluntarios)
    private readonly listarVoluntarios: ListarVoluntarios,
  ) {}

  @ApiOkResponse({
    isArray: true,
    description: 'Lista de voluntários',
    type: ListaVoluntariosDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro genérico',
  })
  @Get(':tipo?')
  @OptionalAuth()
  async listar(
    @User() user?: ITokenUser,
    @Param() params?: TipoUsuarioParam,
  ): Promise<ListaVoluntariosDto[]> {
    return this.listarVoluntarios.execute(user, params?.tipo);
  }
}
