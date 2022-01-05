import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { INovoAtendimentoService } from './atendimentos.service';
import { AtendimentosDbEntity } from '../entidades/atendimentos-db.entity';
import {
  Atendimento,
  NovoAtendimento,
} from '../../../_business/atendimentos/entidades/atendimentos.entity';

@Injectable()
export class TypeormAtendimentosService implements INovoAtendimentoService {
  constructor(
    @InjectRepository(AtendimentosDbEntity)
    private readonly repository: Repository<Atendimento>,
  ) {}

  async criar(atendimento: NovoAtendimento): Promise<void> {
    const entity = this.repository.create(atendimento);
    await this.repository.save(entity);
  }
}