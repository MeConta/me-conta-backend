import {
  Body,
  Controller,
  ForbiddenException,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  CadastrarVoluntario,
  CamposDeFormacaoError,
} from '../_business/voluntarios/casos-de-uso/cadastrar-voluntario.feat';
import { CreateVoluntarioDto } from '../_adapters/voluntarios/dto/create-voluntario.dto';
import {
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Auth } from '../_adapters/auth/decorators/auth.decorator';
import { TipoUsuario } from '../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { User } from '../_adapters/auth/decorators/user.decorator';
import { Usuario } from '../_business/usuarios/entidades/usuario.entity';
import {
  UsuarioInvalidoError,
  UsuarioNaoEncontradoError,
} from '../_business/usuarios/erros/erros';

@Controller('cadastro-voluntario')
export class CadastroVoluntarioController {
  constructor(
    @Inject(CadastrarVoluntario)
    private readonly cadastrarVoluntario: CadastrarVoluntario,
  ) {}
  @ApiUnprocessableEntityResponse({
    description: 'Campos de formação incorretos',
  })
  @ApiForbiddenResponse({
    description: 'Este usuário não tem permissão',
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro genérico',
  })
  @Post()
  @Auth(TipoUsuario.ATENDENTE, TipoUsuario.SUPERVISOR)
  async cadastrar(
    @Body() dto: CreateVoluntarioDto,
    @User() user: Usuario,
  ): Promise<void> {
    try {
      await this.cadastrarVoluntario.execute({
        ...dto,
        usuario: user,
      });
    } catch (e) {
      switch (true) {
        case e instanceof UsuarioNaoEncontradoError:
          throw new NotFoundException(e);
        case e instanceof CamposDeFormacaoError:
          throw new UnprocessableEntityException(e);
        case e instanceof UsuarioInvalidoError:
          throw new ForbiddenException(e);
        default:
          throw new InternalServerErrorException({
            code: 500,
            message: 'Erro genérico',
          });
      }
    }
  }
}
