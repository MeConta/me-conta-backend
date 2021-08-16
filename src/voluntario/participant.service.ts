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

export function ParticipantService(
  Entity,
  tipo: Tipo,
  CreateDto,
  UpdateDto,
): Type<IDefaultService<typeof Entity, typeof CreateDto, typeof UpdateDto>> {
  @Injectable()
  class ParticipantServiceHost extends DefaultService<
    typeof CreateDto,
    typeof UpdateDto
  >(Entity) {
    @Inject(UsuarioService) usuarioService: UsuarioService;

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

    async update(id: number, dto: typeof UpdateDto): Promise<typeof Entity> {
      const entity = await this.findOne(id);

      const {
        email,
        genero,
        cidade,
        UF,
        nome,
        senha,
        dataNascimento,
        telefone,
        ...participant
      } = dto;

      await this.usuarioService.update(entity.usuario.id, {
        email,
        genero,
        cidade,
        UF,
        nome,
        senha,
        dataNascimento,
        telefone,
      } as UpdateUsuarioDto);

      return await super.update(id, participant);
    }
  }
  return ParticipantServiceHost;
}
