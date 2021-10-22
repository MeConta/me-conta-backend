import { Injectable } from '@nestjs/common';
import { ICadastrarNovoAlunoService } from '../../../_business/alunos/services/alunos.service';
import { InjectRepository } from '@nestjs/typeorm';
import { AlunoDbEntity } from '../entidades/aluno.db.entity';
import { Repository } from 'typeorm';
import {
  Aluno,
  Motivos,
  NovoAluno,
} from '../../../_business/alunos/entidades/aluno.entity';
import {
  AtualizarAlunoInput,
  IAtualizarAlunoService,
  IBuscarAlunoViaId,
} from '../../../_business/alunos/casos-de-uso/atualizar-aluno.feat';

@Injectable()
export class TypeormAlunoService
  implements
    ICadastrarNovoAlunoService,
    IBuscarAlunoViaId,
    IAtualizarAlunoService
{
  constructor(
    @InjectRepository(AlunoDbEntity)
    private readonly repository: Repository<Aluno & Motivos>,
  ) {}

  async cadastrar(aluno: NovoAluno): Promise<void> {
    const entity = this.repository.create(aluno);
    await this.repository.save(entity);
  }

  async findById(id: number): Promise<Aluno & Motivos> {
    return this.repository.findOne(id);
  }

  async atualizar(
    id: number,
    input: AtualizarAlunoInput,
  ): Promise<Aluno & Motivos> {
    return this.repository.save({
      id,
      ...input,
    });
  }
}
