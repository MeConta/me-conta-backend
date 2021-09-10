import { Body, Param } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { DefaultController } from '../default.controller';
import { Usuario } from './entities/usuario.entity';
import { ApiTags } from '@nestjs/swagger';
import { Auth, PatchApi, PostApi } from '../decorators';

@ApiTags('Usuário')
export class UsuarioController extends DefaultController(
  'usuario',
  Usuario,
  UsuarioService,
  CreateUsuarioDto,
  UpdateUsuarioDto,
) {
  @PostApi()
  create(@Body() dto: CreateUsuarioDto): Promise<Usuario> {
    return super.create(dto);
  }

  @PatchApi()
  @Auth()
  update(
    @Param('id') id: number,
    @Body() dto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    return super.update(id, dto);
  }
}
