import { ParticipantService } from './participant.service';
import { Inject, Injectable, Type } from '@nestjs/common';
import { IDefaultService } from '../default.service';
import { Tipo } from '../usuario/entities/usuario.enum';
import { FrenteAtuacaoService } from '../frente-atuacao/frente-atuacao.service';

export function VoluntarioService(
  Entity,
  tipo: Tipo,
  CreateDto,
  UpdateDto,
): Type<IDefaultService<typeof Entity, typeof CreateDto, typeof UpdateDto>> {
  @Injectable()
  class VoluntarioServiceHost extends ParticipantService(
    Entity,
    tipo,
    CreateDto,
    UpdateDto,
  ) {
    @Inject(FrenteAtuacaoService) frenteAtuacaoService: FrenteAtuacaoService;
  }
  return VoluntarioServiceHost;
}
