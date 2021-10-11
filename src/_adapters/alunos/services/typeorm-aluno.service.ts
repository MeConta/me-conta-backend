import { Injectable } from '@nestjs/common';
import { ICadastrarNovoAlunoService } from '../../../_business/alunos/services/alunos.service';
import { InjectRepository } from '@nestjs/typeorm';
import { AlunoDbEntity } from '../entidades/aluno.db.entity';
import { Repository } from 'typeorm';
import {
  Aluno,
  NovoAluno,
} from '../../../_business/alunos/entidades/aluno.entity';

@Injectable()
export class TypeormAlunoService implements ICadastrarNovoAlunoService {
  constructor(
    @InjectRepository(AlunoDbEntity)
    private readonly repository: Repository<Aluno>,
  ) {}

  async cadastrar(aluno: NovoAluno): Promise<void> {
    const entity = this.repository.create(aluno);
    await this.repository.save(entity);
  }
}
