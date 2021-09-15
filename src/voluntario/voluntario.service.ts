import { ParticipantService } from './participant.service';
import {
  Inject,
  Injectable,
  Type,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IDefaultService } from '../default.service';
import { Tipo } from '../usuario/entities/usuario.enum';
import { FrenteAtuacaoService } from '../frente-atuacao/frente-atuacao.service';
import { Erros } from '../config/constants';
import { FrenteAtuacao } from '../frente-atuacao/entities/frente-atuacao.entity';
import * as moment from 'moment';

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

    private async checkFrentes(dto: typeof CreateDto) {
      const frentes = await this.frenteAtuacaoService.getFrentes(
        dto.frentesAtuacao,
      );
      if (
        !Array.from<FrenteAtuacao>(dto.frentesAtuacao).every(
          (val: FrenteAtuacao, index: number) => val.id === frentes[index]?.id,
        )
      ) {
        throw new UnprocessableEntityException(
          Erros.FRENTE_ATUACAO_INEXISTENTE,
        );
      }
      return {
        ...dto,
        frentesAtuacao: frentes,
      };
    }

    async create(dto: typeof CreateDto): Promise<typeof Entity> {
      if (moment().diff(dto.dataNascimento, 'years') < 18) {
        throw new UnprocessableEntityException(Erros.IDADE_MINIMA);
      }
      dto = await this.checkFrentes(dto);
      return super.create(dto);
    }

    async update(id: number, dto: typeof UpdateDto): Promise<typeof Entity> {
      if (dto.frentesAtuacao) {
        dto = await this.checkFrentes(dto);
      }
      return super.update(id, dto);
    }
  }
  return VoluntarioServiceHost;
}
