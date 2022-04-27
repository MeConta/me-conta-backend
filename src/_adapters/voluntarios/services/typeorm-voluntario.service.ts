import { Injectable } from '@nestjs/common';
import {
  ICadastrarNovoVoluntarioService,
  NovoVoluntario,
} from '../../../_business/voluntarios/casos-de-uso/cadastrar-voluntario.feat';
import { InjectRepository } from '@nestjs/typeorm';
import { VoluntarioDbEntity } from '../entidades/voluntario-db.entity';
import { FindOperator, getManager, In, Repository } from 'typeorm';
import {
  IAtualizarAprovacaoVoluntario,
  IBuscarVoluntarios,
  IBuscarVoluntarioViaId,
} from '../../../_business/voluntarios/services/voluntario.service';
import { Voluntario } from '../../../_business/voluntarios/entidades/voluntario.entity';
import { UsuarioDbEntity } from '../../usuarios/entidades/usuario.db.entity';
import { VoluntarioOutput } from '../../../_business/voluntarios/dtos/voluntario.dto';

type WhereCondition<T> = {
  [P in keyof T]?: FindOperator<T[P] | T[P][]>;
};

@Injectable()
export class TypeormVoluntarioService
  implements
    ICadastrarNovoVoluntarioService,
    IBuscarVoluntarioViaId,
    IAtualizarAprovacaoVoluntario,
    IBuscarVoluntarios
{
  constructor(
    @InjectRepository(VoluntarioDbEntity)
    private readonly repository: Repository<VoluntarioDbEntity>,
  ) {}

  async cadastrar(voluntario: NovoVoluntario): Promise<void> {
    const entity = this.repository.create(voluntario);
    await this.repository.save(entity);
  }

  async atualizarAprovacao(
    id: number,
    { link, aprovado }: Pick<Voluntario, 'link' | 'aprovado'>,
  ): Promise<void> {
    await this.repository.save({
      id,
      aprovado,
      link,
    });
  }

  async findById(id: number): Promise<VoluntarioOutput> {
    return this.repository.findOne(id);
  }

  async buscar(simpleWhere?: Partial<Voluntario>): Promise<VoluntarioOutput[]> {
    const complexWhere: WhereCondition<Voluntario> = {};
    if (simpleWhere?.frentes) {
      complexWhere.frentes = In([simpleWhere.frentes]);
    }

    return this.repository.find({
      relations: [
        getManager().getRepository(UsuarioDbEntity).metadata.tableName,
      ],
      where: {
        ...simpleWhere,
        ...complexWhere,
      },
    });
  }
}
