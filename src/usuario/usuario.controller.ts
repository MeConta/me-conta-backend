import { Body, Param } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from '../_adapters/usuarios/dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { DefaultController } from '../default.controller';
import { Usuario } from '../_business/usuarios/entidades/usuario.entity';
import { ApiTags } from '@nestjs/swagger';
import { Auth, PatchApi, PostApi } from '../decorators';
import { Tipo } from './entities/usuario.enum';
import { UsuarioDbEntity } from '../_adapters/usuarios/entidades/usuario.db.entity';

@ApiTags('Usuário')
export class UsuarioController extends DefaultController(
  'usuario',
  UsuarioDbEntity,
  UsuarioService,
  CreateUsuarioDto,
  UpdateUsuarioDto,
) {
  @PostApi()
  create(@Body() dto: CreateUsuarioDto): Promise<Usuario> {
    return super.create(dto);
  }

  @PatchApi()
  @Auth(Tipo.ADMINISTRADOR)
  update(
    @Param('id') id: number,
    @Body() dto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    return super.update(id, dto);
  }
}
