import {
  Inject,
  Injectable,
  Type,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DefaultService, IDefaultService } from '../../src/default.service';
import { Tipo } from '../../src/usuario/entities/usuario.enum';
import { FrenteAtuacaoService } from '../frente-atuacao/frente-atuacao.service';
import { Erros } from '../../src/config/constants';
import { FrenteAtuacao } from '../frente-atuacao/entities/frente-atuacao.entity';
import * as moment from 'moment';
import { UsuarioService } from '../../src/usuario/usuario.service';
import { Aluno } from '../aluno/entities/aluno.entity';

export function VoluntarioService(
  Entity,
  tipo: Tipo,
  CreateDto,
  UpdateDto,
): Type<IDefaultService<typeof Entity, typeof CreateDto, typeof UpdateDto>> {
  @Injectable()
  class VoluntarioServiceHost extends DefaultService(
    Entity,
    CreateDto,
    UpdateDto,
  ) {
    @Inject(FrenteAtuacaoService) frenteAtuacaoService: FrenteAtuacaoService;
    @Inject(UsuarioService) usuarioService: UsuarioService;

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

      const usuario = await this.usuarioService.create(dto);

      return super.create({
        ...dto,
        aprovado: null,
        usuario,
      });
    }

    async update(id: number, dto: typeof UpdateDto): Promise<typeof Entity> {
      const entity = await this.findOne(id);
      if (dto.frentesAtuacao) {
        dto = await this.checkFrentes(dto);
      }

      await this.usuarioService.update(entity.usuario.id, dto);
      return super.update(id, dto);
    }

    async findByUserId(userId: number): Promise<Aluno> {
      return this.repository.findOne({
        where: {
          usuario: {
            id: userId,
          },
        },
      });
    }
  }
  return VoluntarioServiceHost;
}
