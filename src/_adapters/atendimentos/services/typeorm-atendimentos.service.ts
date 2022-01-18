import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import {
  IAtualizarStatusAtendimentoService,
  IBuscarAtendimentoViaIdService,
  IHistoricoAtendimentoService,
  INovoAtendimentoService,
  IBuscarAtendimentosAntigosEmAbertoService,
} from './atendimentos.service';
import { AtendimentosDbEntity } from '../entidades/atendimentos-db.entity';
import {
  Atendimento,
  NovoAtendimento,
  StatusAtendimento,
} from '../../../_business/atendimentos/entidades/atendimentos.entity';
import { Usuario } from '../../../_business/usuarios/entidades/usuario.entity';

@Injectable()
export class TypeormAtendimentosService
  implements
    INovoAtendimentoService,
    IHistoricoAtendimentoService,
    IBuscarAtendimentoViaIdService,
    IAtualizarStatusAtendimentoService,
    IBuscarAtendimentosAntigosEmAbertoService
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

  async consultar(aluno: Usuario['id']): Promise<Atendimento[]> {
    return this.repository.find({
      where: { aluno },
    });
  }

  buscar(id: Atendimento['id']): Promise<Atendimento> {
    return this.repository.findOne(id);
  }

  async buscarAntigosEmAberto(): Promise<Atendimento[]> {
    return this.repository.find({
      relations: ['slotAgenda'],
      where: {
        status: StatusAtendimento.ABERTO,
        slotAgenda: {
          fim: LessThan(new Date()),
        },
      },
    });
  }
}
