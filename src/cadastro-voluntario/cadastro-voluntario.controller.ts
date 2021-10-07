import {
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  CadastrarVoluntario,
  UsuarioNaoEncontradoError,
  CamposDeFormacaoError,
} from '../_business/voluntarios/casos-de-uso/cadastrar-voluntario.feat';
import { CreateVoluntarioDto } from '../_adapters/voluntarios/dto/create-voluntario.dto';
import { ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { Auth } from '../_adapters/auth/decorators/auth.decorator';
import { TipoUsuario } from '../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { User } from '../_adapters/auth/decorators/user.decorator';
import { Usuario } from '../_business/usuarios/entidades/usuario.entity';

@Controller('cadastro-voluntario')
export class CadastroVoluntarioController {
  constructor(private cadastrarVoluntario: CadastrarVoluntario) {}
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
        default:
          throw new InternalServerErrorException({
            code: 500,
            message: 'Erro genérico',
          });
      }
    }
  }
}
