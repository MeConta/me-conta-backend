import { DefaultEntity } from '../../../default.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Aluno } from '../../aluno/entities/aluno.entity';
import { Agenda } from '../../agenda/entities/agenda.entity';

@Entity('consulta')
export class Consulta extends DefaultEntity {
  @ManyToOne(() => Aluno, { nullable: false, eager: true })
  @JoinColumn()
  aluno!: Aluno;

  @ManyToOne(() => Agenda, (agenda) => agenda.consulta, {
    nullable: false,
    eager: true,
  })
  @JoinColumn()
  agenda!: Agenda;
}
