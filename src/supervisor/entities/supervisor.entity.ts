import { Column, Entity } from 'typeorm';
import { DefaultEntity } from '../../default.entity';
import { AreaAtuacao } from './supervisor.enum';
import { Voluntario } from '../../voluntario/entity/voluntario.entity';

@Entity('supervisor')
export class Supervisor extends Voluntario {
  @Column({
    type: 'enum',
    enum: AreaAtuacao,
  })
  areaAtuacao: AreaAtuacao;

  @Column()
  crp: string;
}
