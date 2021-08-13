import { Column, Entity, OneToMany } from 'typeorm';
import { AreaAtuacao } from './supervisor.enum';
import { Voluntario } from '../../voluntario/entity/voluntario.entity';
import { Atendente } from '../../atendente/entities/atendente.entity';

@Entity('supervisor')
export class Supervisor extends Voluntario {
  @Column({
    type: 'varchar',
    enum: AreaAtuacao,
  })
  areaAtuacao: AreaAtuacao;

  @Column()
  crp: string;

  @OneToMany(() => Atendente, (atendente) => atendente.supervisor)
  atendentes: Atendente[];
}
