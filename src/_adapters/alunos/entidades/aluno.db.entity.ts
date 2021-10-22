import {
  Aluno,
  Escolaridade,
  Motivos,
  TipoEscola,
} from '../../../_business/alunos/entidades/aluno.entity';
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
import { TypeormDefaultEntity } from '../../entidades/typeorm.default.entity';

@Entity('aluno')
export class AlunoDbEntity
  extends TypeormDefaultEntity
  implements Aluno, Motivos
{
  @Column({
    type: 'simple-enum',
    enum: Escolaridade,
  })
  escolaridade: Escolaridade;

  @Column({
    type: 'simple-enum',
    enum: TipoEscola,
  })
  tipoEscola: TipoEscola;

  @Column({
    nullable: true,
  })
  necessidades?: string;

  @Column({
    nullable: true,
  })
  expectativas: string;

  @Column({
    nullable: true,
  })
  tratamentos: string;

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
