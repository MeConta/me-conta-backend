import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ListarVoluntarios } from '../../../_business/voluntarios/casos-de-uso/listar-voluntarios.feat';
import { User } from '../../../_adapters/auth/decorators/user.decorator';
import { Voluntario } from '../../../_business/voluntarios/entidades/voluntario.entity';
import { ApiTags } from '@nestjs/swagger';
import { OptionalAuth } from '../../../_adapters/auth/decorators/auth.decorator';
import { ITokenUser } from '../../../_business/auth/interfaces/auth';
import { TipoUsuarioParam } from '../dto/voluntario.dto';

@ApiTags('Voluntários')
@Controller('voluntarios/listar')
export class ListarVoluntariosController {
  constructor(
    @Inject(ListarVoluntarios)
    private readonly listarVoluntarios: ListarVoluntarios,
  ) {}

  @Get(':tipo?')
  @OptionalAuth()
  async listar(
    @User() user?: ITokenUser,
    @Param() params?: TipoUsuarioParam,
  ): Promise<Voluntario[]> {
    return this.listarVoluntarios.execute(user, params?.tipo);
  }
}
