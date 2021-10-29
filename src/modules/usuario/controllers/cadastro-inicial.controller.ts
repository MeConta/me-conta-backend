import {
  Body,
  ConflictException,
  Controller,
  ForbiddenException,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import {
  CreateUsuarioDto,
  CreateUsuarioResponseDto,
} from '../../../_adapters/usuarios/dto/create-usuario.dto';
import {
  CadastrarNovoUsuario,
  DuplicatedError,
  NoAdminCreationError,
} from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import {
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Usuário')
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
  async cadastrar(
    @Body() dto: CreateUsuarioDto,
  ): Promise<CreateUsuarioResponseDto> {
    try {
      const { id, nome, tipo, email } = await this.cadastrarNovoUsuario.execute(
        dto,
      );
      return { id, nome, tipo, email };
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
