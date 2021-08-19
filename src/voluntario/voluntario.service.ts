import { ParticipantService } from './participant.service';
import {
  BadRequestException,
  Inject,
  Injectable,
  Post,
  Type,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IDefaultService } from '../default.service';
import { Tipo } from '../usuario/entities/usuario.enum';
import { FrenteAtuacaoService } from '../frente-atuacao/frente-atuacao.service';
import { FindConditions, In } from 'typeorm';
import { Voluntario } from './entity/voluntario.entity';
import { Erros } from '../erros.enum';
import { FrenteAtuacao } from '../frente-atuacao/entities/frente-atuacao.entity';
import { isNumber, isNumberString } from 'class-validator';

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

    @Post()
    async create(dto: typeof CreateDto): Promise<typeof Entity> {
      const frentes = await this.frenteAtuacaoService.findAll({
        where: {
          id: In(
            dto.frentesAtuacao.map((frente) => {
              if (!isNumber(frente.id)) {
                throw new BadRequestException(Erros.FRENTE_ATUACAO_INVALIDA);
              }
              return frente.id;
            }),
          ),
        },
      } as FindConditions<Voluntario>);
      if (
        !Array.from<FrenteAtuacao>(dto.frentesAtuacao).every(
          (val: FrenteAtuacao, index) => val.id === frentes[index]?.id,
        )
      ) {
        throw new UnprocessableEntityException(
          Erros.FRENTE_ATUACAO_INEXISTENTE,
        );
      }
      dto = {
        ...dto,
        frentesAtuacao: frentes,
      };
      return super.create(dto);
    }
  }
  return VoluntarioServiceHost;
}
