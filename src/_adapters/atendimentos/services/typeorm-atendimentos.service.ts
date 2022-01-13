import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IAtualizarStatusAtendimentoService,
  IBuscarAtendimentoViaIdService,
  IHistoricoAtendimentoService,
  INovoAtendimentoService,
} from './atendimentos.service';
import { AtendimentosDbEntity } from '../entidades/atendimentos-db.entity';
import {
  Atendimento,
  NovoAtendimento,
  StatusAtendimento,
} from '../../../_business/atendimentos/entidades/atendimentos.entity';

@Injectable()
export class TypeormAtendimentosService
  implements
    INovoAtendimentoService,
    IHistoricoAtendimentoService,
    IBuscarAtendimentoViaIdService,
    IAtualizarStatusAtendimentoService
{
  constructor(
    @InjectRepository(AtendimentosDbEntity)
    private readonly repository: Repository<AtendimentosDbEntity>,
  ) {}

  async atualizarStatus(
    id: Atendimento['id'],
    status: StatusAtendimento,
  ): Promise<Atendimento> {
    return this.repository.save({ id, status });
  }

  async criar(atendimento: NovoAtendimento): Promise<void> {
    const entity = this.repository.create(atendimento);
    await this.repository.save(entity);
  }

  async consultar(aluno: Atendimento['aluno']): Promise<Atendimento[]> {
    return this.repository.find({
      where: { aluno },
    });
  }

  buscar(id: Atendimento['id']): Promise<Atendimento> {
    return this.repository.findOne(id);
  }
}
