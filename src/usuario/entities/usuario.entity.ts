import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { TipoUsuario } from './tipoUsuario.entity';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  senha: string;

  @Column()
  dataNascimento: Date;

  @Column({ length: 2 })
  UF: string;

  @Column()
  genero: string;

  @Column()
  cidade: string;

  @Column()
  telefone: string;

  @Column()
  email: string;

  @OneToOne(() => TipoUsuario)
  @JoinColumn()
  tipoUsuario: TipoUsuario;
}
