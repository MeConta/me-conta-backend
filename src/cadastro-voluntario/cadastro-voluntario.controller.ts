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

@Controller('cadastro-voluntario')
export class CadastroVoluntarioController {
  constructor(private cadastrarVoluntario: CadastrarVoluntario) {}
  @ApiInternalServerErrorResponse({
    description: 'Erro genérico',
  })
  @Post()
  async cadastrar(@Body() dto: CreateVoluntarioDto): Promise<void> {
    try {
      await this.cadastrarVoluntario.execute(dto);
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
