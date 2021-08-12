import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { DefaultEntity } from '../../default.entity';
import { Estado, Genero, Tipo } from './usuario.enum';

@Entity('usuario')
export class Usuario extends DefaultEntity {
  @Column()
  nome: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  senha: string;

  @Column()
  dataNascimento: Date;

  @Column({
    type: 'enum',
    enum: Genero,
    default: Genero.PREFIRO_NAO_DECLARAR,
  })
  genero: Genero;

  @Column({
    type: 'enum',
    enum: Estado,
  })
  UF: Estado;

  @Column()
  cidade: string;

  @Column()
  telefone: string;

  @Column({
    type: 'enum',
    enum: Tipo,
    default: Tipo.ALUNO,
  })
  tipoUsuario: Tipo;
}
