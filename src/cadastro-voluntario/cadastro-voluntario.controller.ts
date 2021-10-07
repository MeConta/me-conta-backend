import {
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import {
  CadastrarVoluntario,
  UsuarioNaoEncontradoError,
} from '../_business/usuarios/casos-de-uso/cadastrar-voluntario.feat';
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
      if (e instanceof UsuarioNaoEncontradoError) {
        throw new NotFoundException(e);
      }
      throw new InternalServerErrorException({
        code: 500,
        message: 'Erro genérico',
      });
    }
  }
}
