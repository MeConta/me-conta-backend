import {
  Inject,
  Injectable,
  Type,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DefaultService, IDefaultService } from '../default.service';
import { UsuarioService } from '../usuario/usuario.service';
import { Tipo } from '../usuario/entities/usuario.enum';
import { Erros } from '../config/constants';

export function ParticipantService(
  Entity,
  tipo: Tipo,
  CreateDto,
  UpdateDto,
): Type<IDefaultService<typeof Entity, typeof CreateDto, typeof UpdateDto>> {
  @Injectable()
  class ParticipantServiceHost extends DefaultService(
    Entity,
    CreateDto,
    UpdateDto,
  ) {
    @Inject(UsuarioService) usuarioService: UsuarioService;

    async create(dto: typeof CreateDto): Promise<typeof Entity> {
      try {
        const { userDto, outrasInformacoes } =
          this.usuarioService.extractUserDto<
            typeof CreateDto,
            typeof UpdateDto
          >(dto, tipo);

        const usuario = await this.usuarioService.create(userDto);

        return await super.create({
          ...outrasInformacoes,
          aprovado: null,
          usuario,
        });
      } catch (e) {
        throw new UnprocessableEntityException(Erros.USUARIO_JA_CADASTRADO);
      }
    }

    async update(id: number, dto: typeof UpdateDto): Promise<typeof Entity> {
      const entity = await this.findOne(id);

      const { userDto, outrasInformacoes } = this.usuarioService.extractUserDto<
        typeof CreateDto,
        typeof UpdateDto
      >(dto, tipo);

      await this.usuarioService.update(entity.usuario.id, userDto);
      return super.update(id, outrasInformacoes);
    }
  }
  return ParticipantServiceHost;
}
