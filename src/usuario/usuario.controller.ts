import { Body, Param, Patch, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { DefaultController } from '../default.controller';
import { Usuario } from './entities/usuario.entity';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Usuário')
export class UsuarioController extends DefaultController(
  'usuario',
  Usuario,
  UsuarioService,
  CreateUsuarioDto,
  UpdateUsuarioDto,
) {
  @Post()
  @ApiCreatedResponse({
    description: `Usuário criado com sucesso`,
    type: Usuario,
  })
  create(@Body() dto: CreateUsuarioDto): Promise<Usuario> {
    return super.create(dto);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: `Item Atualizado com sucesso`,
  })
  @ApiNotFoundResponse({
    description: `Item não encontrado`,
  })
  @ApiNotFoundResponse({
    description: `Item não encontrado`,
  })
  update(
    @Param('id') id: number,
    @Body() dto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    return super.update(id, dto);
  }
}
