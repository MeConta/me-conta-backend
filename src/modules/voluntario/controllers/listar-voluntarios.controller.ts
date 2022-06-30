import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ListarVoluntarios } from '../../../_business/voluntarios/casos-de-uso/listar-voluntarios.feat';
import { User } from '../../../_adapters/auth/decorators/user.decorator';
import { Auth } from '../../../_adapters/auth/decorators/auth.decorator';
import { ITokenUser } from '../../../_business/auth/interfaces/auth';
import {
  VoluntarioQuery,
  VoluntarioParams,
} from '../../../_adapters/voluntarios/dto/tipo-voluntario.param.dto';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ListaVoluntariosDto } from '../../../_adapters/voluntarios/dto/lista-voluntarios.dto';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';

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
  @Auth(TipoUsuario.ADMINISTRADOR, TipoUsuario.ALUNO)
  async listar(
    @User() user?: ITokenUser,
    @Param() params?: VoluntarioParams,
    @Query() query?: VoluntarioQuery,
  ): Promise<ListaVoluntariosDto[]> {
    return this.listarVoluntarios.execute({
      user,
      tipo: params?.tipo,
      frenteAtuacao: query?.frente,
      status: query?.status,
      nome: query?.nome,
    });
  }
}
