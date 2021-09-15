import { Body, Param } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { DefaultController } from '../default.controller';
import { Usuario } from './entities/usuario.entity';
import { ApiTags } from '@nestjs/swagger';
import { Auth, PatchApi, PostApi } from '../decorators';
import { Tipo } from './entities/usuario.enum';

@ApiTags('Usuário')
@Auth(Tipo.ADMINISTRADOR)
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
  update(
    @Param('id') id: number,
    @Body() dto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    return super.update(id, dto);
  }
}
