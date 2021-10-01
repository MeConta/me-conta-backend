import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CreateUsuarioDto } from '../_adapters/usuarios/dto/create-usuario.dto';
import {
  CadastrarNovoUsuario,
  DuplicatedError,
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
  @HttpCode(HttpStatus.NO_CONTENT)
  async cadastrar(@Body() dto: CreateUsuarioDto) {
    try {
      await this.cadastrarNovoUsuario.execute(dto);
    } catch (e) {
      if (e instanceof DuplicatedError) {
        throw new ConflictException({
          code: 409,
          message: e.message,
        });
      }
      throw new InternalServerErrorException({
        code: 500,
        message: 'Internal Server Error',
      });
    }
  }
}
