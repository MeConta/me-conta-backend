import { DefaultEntity } from '../../default.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Atendente } from '../../atendente/entities/atendente.entity';
import { Consulta } from '../../consulta/entities/consulta.entity';

@Entity('agenda')
export class Agenda extends DefaultEntity {
  @OneToOne(() => Atendente)
  @JoinColumn()
  atendente: Atendente;

  @Column()
  data: Date;

  @OneToOne(() => Consulta, {
    nullable: true,
  })
  consulta: Consulta;
}
