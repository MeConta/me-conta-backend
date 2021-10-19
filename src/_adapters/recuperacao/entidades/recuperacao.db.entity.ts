import { TypeormDefaultEntity } from '../../entidades/typeorm.default.entity';
import { Recuperacao } from '../../../_business/recuperacao/entidades/recuperacao.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { UsuarioDbEntity } from '../../usuarios/entidades/usuario.db.entity';
import { Usuario } from '../../../_business/usuarios/entidades/usuario.entity';

@Entity('recuperacao')
export class RecuperacaoDbEntity
  extends TypeormDefaultEntity
  implements Recuperacao
{
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

  @Column()
  hash: string;
}
