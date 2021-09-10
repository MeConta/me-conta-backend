import { Body, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { DefaultController } from '../default.controller';
import { Usuario } from './entities/usuario.entity';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TOKEN_NAME } from '../config/swagger.config';

@ApiTags('Usuário')
export class UsuarioController extends DefaultController(
  'usuario',
  Usuario,
  UsuarioService,
  CreateUsuarioDto,
  UpdateUsuarioDto,
) {
  @Post()
  @ApiBadRequestResponse({
    description: `Requisição inválida`,
  })
  @ApiUnprocessableEntityResponse({
    description: `Violação de regra de negócio`,
  })
  create(@Body() dto: CreateUsuarioDto): Promise<Usuario> {
    return super.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth(TOKEN_NAME)
  @ApiNotFoundResponse({
    description: `Item não encontrado`,
  })
  @ApiBadRequestResponse({
    description: `Requisição inválida`,
  })
  @ApiUnprocessableEntityResponse({
    description: `Violação de regra de negócio`,
  })
  update(
    @Param('id') id: number,
    @Body() dto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    return super.update(id, dto);
  }
}
