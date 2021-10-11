import { Injectable } from '@nestjs/common';
import {
  ICadastrarNovoVoluntarioService,
  NovoVoluntario,
} from '../../../_business/voluntarios/casos-de-uso/cadastrar-voluntario.feat';
import { InjectRepository } from '@nestjs/typeorm';
import { VoluntarioDbEntity } from '../entidades/voluntario-db.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypeormVoluntarioService
  implements ICadastrarNovoVoluntarioService
{
  constructor(
    @InjectRepository(VoluntarioDbEntity)
    private readonly repository: Repository<VoluntarioDbEntity>,
  ) {}

  async cadastrar(voluntario: NovoVoluntario): Promise<void> {
    const entity = this.repository.create(voluntario);
    await this.repository.save(entity);
  }
}
