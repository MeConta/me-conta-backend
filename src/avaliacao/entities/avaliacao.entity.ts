import { DefaultEntity } from '../../default.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Aluno } from '../../aluno/entities/aluno.entity';
import { Consulta } from '../../consulta/entities/consulta.entity';

@Entity('avaliacao')
export class Avaliacao extends DefaultEntity {
  @OneToOne(() => Aluno)
  @JoinColumn()
  aluno: Aluno;

  @OneToOne(() => Consulta)
  @JoinColumn()
  consulta: Consulta;

  @Column()
  nota: number;

  @Column()
  comentario: string;

  @Column()
  mostrar: boolean;

  @Column()
  anonimo: boolean;

  @Column()
  aprovado: boolean;
}
