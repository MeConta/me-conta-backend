import { DefaultEntity } from '../../default.entity';
import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { Atendente } from '../../atendente/entities/atendente.entity';
import { Aluno } from '../../aluno/entities/aluno.entity';
import { Agenda } from '../../agenda/entities/agenda.entity';

@Entity('consulta')
export class Consulta extends DefaultEntity {
  @OneToOne(() => Atendente)
  @JoinColumn()
  atendente: Atendente;

  @OneToOne(() => Aluno)
  @JoinColumn()
  aluno: Aluno;

  @OneToOne(() => Agenda)
  @JoinColumn()
  agenda: Agenda;
}
