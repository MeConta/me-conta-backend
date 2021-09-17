import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateFrenteAtuacaoDto } from './dto/create-frente-atuacao.dto';
import { UpdateFrenteAtuacaoDto } from './dto/update-frente-atuacao.dto';
import { DefaultService } from '../../src/default.service';
import { FrenteAtuacao } from './entities/frente-atuacao.entity';
import { Erros } from 'src/config/constants';
import { Voluntario } from '__old/voluntario/entity/voluntario.entity';
import { In, FindConditions } from 'typeorm';
import { isNumber } from 'class-validator';

@Injectable()
export class FrenteAtuacaoService extends DefaultService(
  FrenteAtuacao,
  CreateFrenteAtuacaoDto,
  UpdateFrenteAtuacaoDto,
) {
  async getFrentes(dtos: FrenteAtuacao[]): Promise<FrenteAtuacao[]> {
    const ids: number[] = dtos.map((frente: FrenteAtuacao) => {
      if (!isNumber(frente.id)) {
        throw new BadRequestException(Erros.FRENTE_ATUACAO_INVALIDA);
      }
      return frente.id;
    });
    try {
      return (
        await this.findAll(
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
      throw new UnprocessableEntityException(Erros.FRENTE_ATUACAO_INEXISTENTE);
    }
  }
}
