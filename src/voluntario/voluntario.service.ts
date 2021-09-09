import { ParticipantService } from './participant.service';
import {
  BadRequestException,
  Inject,
  Injectable,
  Patch,
  Post,
  Type,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IDefaultService } from '../default.service';
import { Tipo } from '../usuario/entities/usuario.enum';
import { FrenteAtuacaoService } from '../frente-atuacao/frente-atuacao.service';
import { FindConditions, In } from 'typeorm';
import { Voluntario } from './entity/voluntario.entity';
import { Erros } from '../config/constants';
import { FrenteAtuacao } from '../frente-atuacao/entities/frente-atuacao.entity';
import { isNumber } from 'class-validator';
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

    async getFrentes(dtos: FrenteAtuacao[]): Promise<FrenteAtuacao[]> {
      const ids: number[] = dtos.map((frente: FrenteAtuacao) => {
        if (!isNumber(frente.id)) {
          throw new BadRequestException(Erros.FRENTE_ATUACAO_INVALIDA);
        }
        return frente.id;
      });
      try {
        return (
          await this.frenteAtuacaoService.findAll(
            {
              page: 1,
              limit: 0,
            },
            {
              where: {
                id: In(ids),
              },
            } as FindConditions<Voluntario>,
          )
        ).items;
      } catch (e) {
        throw new UnprocessableEntityException(
          Erros.FRENTE_ATUACAO_INEXISTENTE,
        );
      }
    }

    private async checkFrentes(dto: typeof CreateDto) {
      const frentes = await this.getFrentes(dto.frentesAtuacao);
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

    @Post()
    async create(dto: typeof CreateDto): Promise<typeof Entity> {
      if (moment().diff(dto.dataNascimento, 'years') < 18) {
        throw new UnprocessableEntityException(Erros.IDADE_MINIMA);
      }
      dto = await this.checkFrentes(dto);
      return super.create(dto);
    }

    @Patch()
    async update(id: number, dto: typeof UpdateDto): Promise<typeof Entity> {
      if (dto.frentesAtuacao) {
        dto = await this.checkFrentes(dto);
      }
      return super.update(id, dto);
    }
  }
  return VoluntarioServiceHost;
}
