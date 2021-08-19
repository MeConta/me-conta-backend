import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { DefaultService } from '../default.service';

@Injectable()
export class UsuarioService extends DefaultService(
  Usuario,
  CreateUsuarioDto,
  UpdateUsuarioDto,
) {}
