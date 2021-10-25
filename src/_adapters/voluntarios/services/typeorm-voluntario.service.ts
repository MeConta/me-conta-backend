import { Injectable } from '@nestjs/common';
import {
  ICadastrarNovoVoluntarioService,
  NovoVoluntario,
} from '../../../_business/voluntarios/casos-de-uso/cadastrar-voluntario.feat';
import { InjectRepository } from '@nestjs/typeorm';
import { VoluntarioDbEntity } from '../entidades/voluntario-db.entity';
import { Repository } from 'typeorm';
import {
  IAtualizarAprovacaoVoluntario,
  IBuscarVoluntarios,
  IBuscarVoluntarioViaId,
} from '../../../_business/voluntarios/services/voluntario.service';
import {
  Bio,
  Voluntario,
} from '../../../_business/voluntarios/entidades/voluntario.entity';

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

  async atualizarAprovacao(id: number, aprovado: boolean): Promise<void> {
    await this.repository.save({
      id,
      aprovado,
    });
  }

  async findById(id: number): Promise<Voluntario & Bio> {
    return this.repository.findOne(id);
  }

  async buscar(search?: Partial<Voluntario>): Promise<(Voluntario & Bio)[]> {
    return this.repository.find({
      relations: ['usuario'],
      where: search,
    });
    // return this.repository.find();
  }
}
