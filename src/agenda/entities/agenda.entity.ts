import { DefaultEntity } from '../../default.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Atendente } from '../../atendente/entities/atendente.entity';
import { Consulta } from '../../consulta/entities/consulta.entity';

@Entity('agenda')
export class Agenda extends DefaultEntity {
  @ManyToOne(() => Atendente, (atendente) => atendente.agendas, {
    eager: true,
  })
  @JoinColumn()
  atendente: Atendente;

  @Column()
  data: Date;

  @OneToOne(() => Consulta, (consulta) => consulta.agenda, {
    nullable: true,
  })
  consulta: Consulta;
}
