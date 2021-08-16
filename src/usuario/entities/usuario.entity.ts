import { Entity, Column } from 'typeorm';
import { DefaultEntity } from '../../default.entity';
import { Estado, Genero, Tipo } from './usuario.enum';
import { Exclude } from 'class-transformer';

@Entity('usuario')
export class Usuario extends DefaultEntity {
  constructor(partial: Partial<DefaultEntity>) {
    super(partial);
    Object.assign(this, partial);
  }

  @Column()
  nome: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  @Exclude()
  senha: string;

  @Column()
  dataNascimento: Date;

  @Column({
    type: 'varchar',
    enum: Genero,
    default: Genero.PREFIRO_NAO_DECLARAR,
  })
  genero: Genero;

  @Column({
    type: 'varchar',
    enum: Estado,
  })
  UF: Estado;

  @Column()
  cidade: string;

  @Column()
  telefone: string;

  @Column({
    type: 'varchar',
    enum: Tipo,
    default: Tipo.ALUNO,
  })
  tipoUsuario: Tipo;
}
