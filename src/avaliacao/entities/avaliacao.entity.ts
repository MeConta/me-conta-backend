import { DefaultEntity } from '../../default.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Consulta } from '../../consulta/entities/consulta.entity';

@Entity('avaliacao')
export class Avaliacao extends DefaultEntity {
  @OneToOne(() => Consulta)
  @JoinColumn()
  consulta: Consulta;

  @Column()
  nota: number;

  @Column()
  comentario: string;

  @Column({
    default: true,
  })
  mostrar: boolean;

  @Column({
    default: false,
  })
  anonimo: boolean;

  @Column({
    nullable: true,
  })
  aprovado: boolean;

  @Column({
    default: () => 'NOW()',
  })
  data: Date;
}
