import {
  Estado,
  Genero,
  Perfil,
  Usuario,
} from '../../../_business/usuarios/entidades/usuario.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { UsuarioDbEntity } from '../../usuarios/entidades/usuario.db.entity';

@Entity('perfil')
export class PerfilDbEntity implements Perfil {
  @Column({ nullable: true })
  cidade?: string;
  @Column({
    nullable: true,
  })
  dataNascimento?: Date;
  @Column({
    type: 'simple-enum',
    enum: Estado,
    nullable: true,
  })
  UF?: Estado;
  @Column({
    type: 'simple-enum',
    enum: Genero,
    nullable: true,
  })
  genero?: Genero;
  @Column({ nullable: true })
  telefone?: string;

  @PrimaryColumn()
  usuarioId: number;

  @BeforeInsert()
  getUsuarioId() {
    this.usuarioId = this.usuario.id;
  }

  @OneToOne(() => UsuarioDbEntity, {
    eager: true,
  })
  @JoinColumn({
    name: 'usuarioId',
  })
  usuario: Usuario;
}
