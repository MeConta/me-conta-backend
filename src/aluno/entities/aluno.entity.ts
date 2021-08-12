import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { DefaultEntity } from '../../default.entity';
import { GrauEnsinoMedio, TipoEscola } from './aluno.enum';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity('aluno')
export class Aluno extends DefaultEntity {
  @Column({
    type: 'enum',
    enum: TipoEscola,
    default: TipoEscola.PUBLICA,
  })
  tipoEscola: TipoEscola;

  @Column({
    type: 'enum',
    enum: GrauEnsinoMedio,
  })
  grauEnsinoMedio: GrauEnsinoMedio;

  @OneToOne(() => Usuario, {
    nullable: false,
  })
  @JoinColumn()
  usuario: Usuario;
}
