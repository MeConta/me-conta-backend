import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Supervisor } from '../../supervisor/entities/supervisor.entity';
import { Voluntario } from '../../voluntario/entity/voluntario.entity';
import { Agenda } from '../../agenda/entities/agenda.entity';

@Entity('atendente')
export class Atendente extends Voluntario {
  @Column()
  formado: boolean;

  @Column({
    nullable: true,
  })
  semestre: number;

  @Column({
    nullable: true,
  })
  anoFormacao: number;

  @OneToOne(() => Supervisor)
  @JoinColumn()
  supervisor: Supervisor;

  @OneToMany(() => Agenda, (agenda) => agenda.atendente)
  agendas: Agenda[];
}
