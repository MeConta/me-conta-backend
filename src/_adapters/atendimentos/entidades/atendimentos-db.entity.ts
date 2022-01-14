import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeormDefaultEntity } from '../../entidades/typeorm.default.entity';
import {
  Atendimento,
  StatusAtendimento,
} from '../../../_business/atendimentos/entidades/atendimentos.entity';
import { Aluno } from '../../../_business/alunos/entidades/aluno.entity';
import { AlunoDbEntity } from '../../alunos/entidades/aluno.db.entity';
import { Usuario } from '../../../_business/usuarios/entidades/usuario.entity';
import { SlotAgenda } from '../../../_business/agenda/entidades/slot-agenda.entity';
import { SlotAgendaDbEntity } from '../../agenda/entidades/slot-agenda-db.entity';

@Entity('atendimentos')
export class AtendimentosDbEntity
  extends TypeormDefaultEntity
  implements Atendimento
{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SlotAgendaDbEntity, (slotAgenda) => slotAgenda.id, {
    lazy: true,
  })
  @JoinColumn({
    name: 'slotAgendaId',
  })
  slotAgenda: Promise<SlotAgenda>;

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
