import { DefaultEntity } from '../../default.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Aluno } from '../../aluno/entities/aluno.entity';
import { Consulta } from '../../consulta/entities/consulta.entity';

@Entity('avaliacao')
export class Avaliacao extends DefaultEntity {
  @ManyToOne(() => Aluno, {
    eager: true,
  })
  @JoinColumn()
  aluno: Aluno;

  @OneToOne(() => Consulta, {
    eager: true,
  })
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
}
