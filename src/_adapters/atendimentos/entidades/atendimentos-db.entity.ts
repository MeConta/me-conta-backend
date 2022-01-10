import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeormDefaultEntity } from '../../entidades/typeorm.default.entity';
import { Voluntario } from '../../../_business/voluntarios/entidades/voluntario.entity';
import { VoluntarioDbEntity } from '../../voluntarios/entidades/voluntario-db.entity';
import {
  Atendimento,
  StatusAtendimento,
} from '../../../_business/atendimentos/entidades/atendimentos.entity';
import { Aluno } from '../../../_business/alunos/entidades/aluno.entity';
import { AlunoDbEntity } from '../../alunos/entidades/aluno.db.entity';
import { Usuario } from '../../../_business/usuarios/entidades/usuario.entity';

@Entity('atendimentos')
export class AtendimentosDbEntity
  extends TypeormDefaultEntity
  implements Atendimento
{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => VoluntarioDbEntity, (voluntario) => voluntario.id, {
    lazy: true,
  })
  @JoinColumn({
    name: 'voluntarioId',
  })
  voluntario: Promise<Voluntario>;

  @Column({ type: 'text', nullable: true })
  anotacoes: string;

  @ManyToOne(() => AlunoDbEntity, (aluno) => aluno.id, {
    lazy: true,
  })
  @JoinColumn({
    name: 'alunoId',
  })
  aluno: Promise<Aluno & Usuario>;

  @Column()
  status: StatusAtendimento;
}
