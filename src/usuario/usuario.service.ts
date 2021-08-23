import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { DefaultService } from '../default.service';
import { Erros } from '../config/constants';

@Injectable()
export class UsuarioService extends DefaultService(
  Usuario,
  CreateUsuarioDto,
  UpdateUsuarioDto,
) {
  async update(id: number, dto: UpdateUsuarioDto): Promise<Usuario> {
    try {
      return await super.update(id, dto);
    } catch (e) {
      if (e instanceof UnprocessableEntityException) {
        throw new UnprocessableEntityException(Erros.EMAIL_DUPLICADO);
      }
      throw e;
    }
  }
}
