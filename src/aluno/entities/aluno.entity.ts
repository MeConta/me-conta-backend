import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { DefaultEntity } from '../../default.entity';
import { GrauEnsinoMedio, TipoEscola } from './aluno.enum';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity('aluno')
export class Aluno extends DefaultEntity {
  @Column({
    type: 'varchar',
    enum: TipoEscola,
    default: TipoEscola.PUBLICA,
  })
  tipoEscola: TipoEscola;

  @Column({
    type: 'integer',
    enum: GrauEnsinoMedio,
  })
  grauEnsinoMedio: GrauEnsinoMedio;

  @OneToOne(() => Usuario, {
    nullable: false,
    eager: true,
  })
  @JoinColumn()
  usuario: Usuario;
}
