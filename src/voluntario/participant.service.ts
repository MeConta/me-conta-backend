import {
  Inject,
  Injectable,
  Type,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DefaultService, IDefaultService } from '../default.service';
import { UsuarioService } from '../usuario/usuario.service';
import { CreateUsuarioDto } from '../usuario/dto/create-usuario.dto';
import { Tipo } from '../usuario/entities/usuario.enum';
import { Erros } from '../erros.enum';
import { UpdateUsuarioDto } from '../usuario/dto/update-usuario.dto';

export function ParticipantService<CreateDto, UpdateDto>(
  Entity,
  tipo: Tipo,
): Type<IDefaultService> {
  @Injectable()
  class ParticipantServiceHost extends DefaultService<CreateDto, UpdateDto>(
    Entity,
  ) {
    @Inject() usuarioService: UsuarioService;

    async create(dto: any): Promise<typeof Entity> {
      try {
        const usuarioDto: CreateUsuarioDto = {
          ...dto,
          tipoUsuario: tipo,
        };
        const usuario = await this.usuarioService.create(usuarioDto);
        dto = {
          ...dto,
          usuario,
        };
        return await super.create(dto);
      } catch (e) {
        throw new UnprocessableEntityException(Erros.USUARIO_JA_CADASTRADO);
      }
    }

    /* async update(id: number, dto: UpdateDto): Promise<typeof Entity> {
      try {
        const entity = await this.findOne(id);
        let { usuario } = entity;

        const usuarioDto: UpdateUsuarioDto = {
          ...usuario,
          ...dto,
        };
        usuario = await this.usuarioService.update(usuario.id, usuarioDto);
        dto = {
          usuario,
          ...entity,
          ...dto,
        } as UpdateDto;
        return await super.update(id, dto);
      } catch (e) {
        throw new UnprocessableEntityException(Erros.PARAMETROS_INCORRETOS);
      }
    }*/
  }
  return ParticipantServiceHost;
}
