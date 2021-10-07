import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { TypeormDefaultEntity } from '../../entidades/typeorm.default.entity';
import { UsuarioDbEntity } from '../../usuarios/entidades/usuario.db.entity';
import { Usuario } from '../../../_business/usuarios/entidades/usuario.entity';
import {
  AreaAtuacao,
  FrenteAtuacao,
  Voluntario,
} from '../../../_business/voluntarios/entidades/voluntario.entity';

@Entity('voluntario')
export class VoluntarioDbEntity
  extends TypeormDefaultEntity
  implements Voluntario
{
  @Column({
    nullable: true,
  })
  anoFormacao: number;

  @Column({
    nullable: true,
  })
  aprovado: boolean;

  @Column({
    nullable: true,
  })
  crp: string;

  @Column()
  formado: boolean;

  @Column({
    type: 'simple-enum',
    array: true,
    enum: FrenteAtuacao,
  })
  frentes: FrenteAtuacao[];

  @Column()
  instituicao: string;

  @Column({
    nullable: true,
  })
  semestre: number;

  @Column({
    nullable: true,
    type: 'simple-enum',
    enum: AreaAtuacao,
  })
  areaAtuacao: AreaAtuacao;

  @Column({
    nullable: true,
  })
  especializacoes: string;

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
