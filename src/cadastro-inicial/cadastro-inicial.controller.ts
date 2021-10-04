import {
  Body,
  ConflictException,
  Controller,
  ForbiddenException,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CreateUsuarioDto } from '../_adapters/usuarios/dto/create-usuario.dto';
import {
  CadastrarNovoUsuario,
  DuplicatedError,
  NoAdminCreationError,
} from '../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import {
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

@Controller('cadastro-inicial')
export class CadastroInicialController {
  constructor(private cadastrarNovoUsuario: CadastrarNovoUsuario) {}
  @ApiConflictResponse({
    description: 'Usuário já cadastrado',
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro genérico',
  })
  @Post()
  async cadastrar(@Body() dto: CreateUsuarioDto) {
    try {
      await this.cadastrarNovoUsuario.execute(dto);
    } catch (e) {
      if (e instanceof DuplicatedError) {
        throw new ConflictException(e);
      }
      if (e instanceof NoAdminCreationError) {
        throw new ForbiddenException(e);
      }
      throw new InternalServerErrorException({
        code: 500,
        message: 'Erro genérico',
      });
    }
  }
}
