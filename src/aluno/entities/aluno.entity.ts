import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DefaultEntity } from '../../default.entity';
import { GrauEnsinoMedio, TipoEscola } from './aluno.enum';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity('aluno')
export class Aluno extends DefaultEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  tipoEscola: TipoEscola;

  @Column('int')
  grauEnsinoMedio: GrauEnsinoMedio;

  @OneToOne(() => Usuario)
  @JoinColumn()
  usuario: Usuario;
}
